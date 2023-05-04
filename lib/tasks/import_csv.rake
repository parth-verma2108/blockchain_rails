# frozen_string_literal: true

namespace :internal do
  task import_csv: :environment do
    require 'csv'
    # CSV.foreach('./db/lender_organizations.csv', headers: false) do |row|
    #   Organization.create(
    #     organization_type: "lender",
    #     name: row[1],
    #     website: row[3],
    #     int_id: row[0]
    #   )
    # end

    CSV.foreach('./db/counties.csv', headers: false) do |row|
      state = State.find_by_name(row[1])
      next unless state
      County.create(
        name: row[0],
        state_id: state.id
      )
    end

    CSV.foreach('./db/postal_codes.csv', headers: false) do |row|
      postal_code = PostalCode.new(
        code: row[0],
        latitude: row[1],
        longitude: row[2]
      )

      postal_code.coordinates = postal_code.point

      postal_code.save
    end

    org_ids = Organization.all.select(:int_id, :id).group_by(&:int_id)
    state_ids = State.all.select(:id, :abbreviation).group_by(&:abbreviation)

    def build_branches(org_ids, state_ids)
      require 'csv'
      CSV.foreach('./db/organization_branches.csv', headers: false) do |row|
        organization_id = org_ids[row[0]&.to_i]&.first&.id

        next unless organization_id.present?

        state_id = state_ids[row[5]]&.first&.id

        next unless state_id.present?
        
        code = nil
        geocoder_result = nil
        if (row[4].nil? && row[2].present? && row[3].present?)
          geocoder_result = Geocoder.search([row[2], row[3]]&.join(','))&.first
          code = geocoder_result&.postal_code
          next unless code.present?
        else
          code = row[4]
          next unless code.present?
          code = "0" + code if code.length < 5
        end

        postal_code = PostalCode.find_by_code(code)

        next unless postal_code.present?

        county = County.find_by(state_id: state_id, name: row[6] || geocoder_result&.county&.gsub(" County", ""))

        next unless county.present?

        OrganizationBranch.create!(
          name: row[1],
          street: row[2],
          city: row[3],
          postal_code_id: postal_code.id,
          state_id: state_id,
          county_id: county.id,
          organization_id: organization_id
        )
      end
    end
  end 
end 
