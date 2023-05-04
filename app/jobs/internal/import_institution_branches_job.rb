class Internal::ImportInstitutionBranchesJob < ApplicationJob
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

    org_ids = Organization.all.select(:int_id, :id, :name).group_by(&:int_id)
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
    CSV.foreach('./db/locations.csv', headers: true) do |row|
      organization_id = org_ids[row["CERT"]&.to_i]&.first&.id
      next unless organization_id.present?

      state_id = state_ids[row["STALP"]]&.first&.id
      next unless state_id.present?

      existing_branch = OrganizationBranch.where(name: row["NAME"], street: row["ADDRESS"], city: row["CITY"], state_id: state_id, organization_id: organization_id)
      next if existing_branch.any?

      geocoder_result = Geocoder.search(row["ADDRESS"] + ", " + row["CITY"] + ", " + row["STALP"] + ", USA")&.first || Geocoder.search(org_ids[row["CERT"]&.to_i]&.first&.name + ", " + row["CITY"] + ", " + row["STALP"] + ", USA")&.first
      next unless geocoder_result.present?

      postal_code = PostalCode.find_by_code(geocoder_result&.postal_code)
      next unless postal_code.present?

      county = County.where(state_id: state_id, name: [row["COUNTY"], geocoder_result.data&.[]("context")&.[](-3)&.[]("text")&.gsub(" County", "")])&.first
      next unless county.present?

      OrganizationBranch.create!(
        name: row["NAME"],
        street: row["ADDRESS"],
        city: row["CITY"],
        postal_code_id: postal_code.id,
        state_id: state_id,
        county_id: county.id,
        organization_id: organization_id,
        longitude: geocoder_result.longitude,
        latitude: geocoder_result.latitude,
        coordinates: factory.point(geocoder_result.longitude, geocoder_result.latitude)
      )
    rescue
      next
    end
  end
end
