class Internal::ImportInstitutionsJob < ApplicationJob
  queue_as :default

  def perform(*args)
    require 'csv'

    # == Schema Information
    #
    # Table name: organizations
    #
    #  id                :uuid             not null, primary key
    #  organization_type :string
    #  name              :string
    #  website           :string
    #  created_at        :datetime         not null
    #  updated_at        :datetime         not null
    #  int_id            :bigint
    #  fdic_cert         :string
    #
    CSV.foreach('./db/institutions.csv', headers: true) do |row|
      next unless row["ACTIVE"] == "1"
      Organization.create!(
        organization_type: "lender",
        name: row["NAME"],
        website: row["WEBADDR"],
        int_id: row["CERT"],
        fdic_cert: row["CERT"]
      )
    rescue
      next
    end
  end
end
