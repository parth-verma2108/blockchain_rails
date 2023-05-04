class Internal::ImportCreditUnionsJob < ApplicationJob
  queue_as :default

  def perform(*args)
    require 'csv'

    Geocoder.configure(
      lookup: :mapbox,
      mapbox: {
        api_key: ENV["MAPBOX_API_KEY"],
        country: "us",
        dataset: "mapbox.places"
      }
    )

    org_ids = {}
    state_ids = State.all.select(:id, :abbreviation).group_by(&:abbreviation)
    factory = Geo.factory

    # == Schema Information
    #
    # Table name: organization_branches
    #
    #  id              :uuid             not null, primary key
    #  name            :string
    #  street          :string
    #  city            :string
    #  postal_code_id  :uuid             not null
    #  state_id        :uuid             not null
    #  county_id       :uuid             not null
    #  created_at      :datetime         not null
    #  updated_at      :datetime         not null
    #  organization_id :uuid             not null
    #  coordinates     :geography        point, 4326
    #  longitude       :float
    #  latitude        :float
    #  phone_number    :string
    CSV.foreach('./db/credit_unions.csv', headers: true) do |row|
      next unless row["PhysicalAddressCountry"] == "United States"

      cu_number_string = row.to_h.keys.first
      organization_id = org_ids[row[cu_number_string]]
      
      unless organization_id
        organization = Organization.create(
          organization_type: "lender",
          name: row["CU_NAME"],
          int_id: row[cu_number_string],
        )

        org_ids[cu_number_string] = organization.id
        organization_id = organization.id
      end

      next unless organization_id.present?

      state_id = state_ids[row["PhysicalAddressStateCode"]]&.first&.id
      next unless state_id.present?

      existing_branch = OrganizationBranch.where(
        name: (row["CU_NAME"] || "") + (row["SiteName"].present? ? ", " + row["SiteName"] : ""),
        street: row["PhysicalAddressLine1"] + (row["PhysicalAddressLine2"].present? ? ", " + row["PhysicalAddressLine2"] : ""),
        city: row["PhysicalAddressCity"],
        state_id: state_id,
        organization_id: organization_id
      )
      next if existing_branch.any?

      geocoder_result = Geocoder.search(row["CU_NAME"] + " Credit Union, " + (row["PhysicalAddressLine2"].present? ? row["PhysicalAddressLine2"] + ", " : "") + row["PhysicalAddressCity"] + ", " + row["PhysicalAddressStateCode"] + ", USA")&.first ||
                        Geocoder.search(row["CU_NAME"] + " Credit Union, " + row["PhysicalAddressLine1"] + ", " + row["PhysicalAddressCity"] + ", " + row["PhysicalAddressStateCode"] + ", USA")&.first ||
                        Geocoder.search(row["CU_NAME"] + ", " + row["PhysicalAddressCity"] + ", " + row["PhysicalAddressStateCode"] + ", USA")&.first

      next unless geocoder_result.present?

      postal_code = PostalCode.find_by_code(geocoder_result&.postal_code)
      next unless postal_code.present?

      county = County.where(state_id: state_id, name: [row["PhysicalAddressCountyName"], geocoder_result.data&.[]("context")&.[](-3)&.[]("text")&.gsub(" County", "")])&.first
      next unless county.present?

      OrganizationBranch.create!(
        name: (row["CU_NAME"] || "") + (row["SiteName"].present? ? ", " + row["SiteName"] : ""),
        street: row["PhysicalAddressLine1"] + (row["PhysicalAddressLine2"].present? ? ", " + row["PhysicalAddressLine2"] : ""),
        city: row["PhysicalAddressCity"],
        postal_code_id: postal_code.id,
        state_id: state_id,
        county_id: county.id,
        organization_id: organization_id,
        longitude: geocoder_result.longitude,
        latitude: geocoder_result.latitude,
        phone_number: row["PhoneNumber"],
        coordinates: factory.point(geocoder_result.longitude, geocoder_result.latitude)
      )
    rescue StandardError => e
      next
    end
  end
end
