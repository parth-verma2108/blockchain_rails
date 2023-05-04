# frozen_string_literal: true

# == Schema Information
#
# Table name: postal_codes
#
#  id          :uuid             not null, primary key
#  state_id    :uuid
#  code        :string           not null
#  coordinates :geography        not null, point, 4326
#  longitude   :float            not null
#  latitude    :float            not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class PostalCode < ApplicationRecord
  has_many :organization_branches

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

  def near(distance) #distance as miles
    PostalCode.near(
      Geo.point(longitude, latitude),
      distance
    )
  end

  def point
    Geo.point(longitude, latitude)
  end
end
