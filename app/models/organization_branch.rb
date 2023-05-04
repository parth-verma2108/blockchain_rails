# frozen_string_literal: true

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
#
class OrganizationBranch < ApplicationRecord
  belongs_to :organization, touch: false
  belongs_to :postal_code, touch: false
  belongs_to :state, touch: false
  belongs_to :county, touch: false

  def self.near(point, distance)
    where(
      'ST_DWithin(coordinates, :point, :distance)',
      { point: Geo.to_wkt(point), distance: distance * 1609.34 }
    ).ordered_by_distance_from(point)
  end

  def self.ordered_by_distance_from(point)
    order(
      Arel.sql(<<-SQL.squish
        ST_Distance(coordinates, ST_Geomfromtext(#{Geo.to_order_wkt(point)})) DESC
      SQL
      )
    )
  end
end

# factory = Geo.factory
# total_num = OrganizationBranch.all.count
# processed = 0.0

# OrganizationBranch.includes(:organization).all.includes(:organization, :postal_code, :state, :county).find_each do |branch|
#   search = Geocoder.search(branch.street + ", " + branch.city + ", " + branch.state.abbreviation + ", USA")&.first || Geocoder.search(branch.organization.name + "," + branch.city + ", " + branch.state.abbreviation + ", USA")&.first

#   if search
#     branch.update(longitude: search.longitude, latitude: search.latitude, coordinates: factory.point(search.longitude, search.latitude))
#   end

#   processed += 1
#   puts "#{(processed / total_num).to_f.round(2)}% done" if processed % 120 == 0
# end
