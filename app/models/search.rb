# frozen_string_literal: true

# == Schema Information
#
# Table name: searches
#
#  id                            :uuid             not null, primary key
#  user_id                       :uuid             not null
#  property_types_financed       :text             is an Array
#  created_at                    :datetime         not null
#  updated_at                    :datetime         not null
#  name                          :string
#  loan_amount_requested_cents   :bigint
#  location_city                 :string
#  location_postal_code_id       :uuid
#  location_state_id             :uuid
#  property_type_financed        :text             default([]), is an Array
#  location_range                :bigint
#  type_of_institution           :text             default([]), is an Array
#  direct_lender_mortgage_broker :string
#  retail_wholesale              :string
#  type_of_financing             :text             default([]), is an Array
#  recourse                      :text             default([]), is an Array
#  foreign_nationals_considered  :boolean
#  discarded_at                  :datetime
#

class Search < ApplicationRecord
  include Discard::Model

  default_scope -> { kept }

  belongs_to :user

  belongs_to :location_postal_code, class_name: 'PostalCode', optional: true
  belongs_to :location_state, class_name: 'State', optional: true

  def self.new_from_params(params)
    search = Search.new(
      params.slice(
        :user_id,
        :name,
        :location_city,
        :property_type_financed,
        :type_of_institution,
        :direct_lender_mortgage_broker,
        :type_of_financing,
        :recourse,
        :loan_amount_requested_cents
      )
    )

    search.direct_lender_mortgage_broker = params[:direct_lender_mortgage_broker]&.[]("value") if params[:direct_lender_mortgage_broker]
    search.location_postal_code_id = PostalCode.find_by_code(params[:location_postal_code])&.id if params[:location_postal_code]
    search.location_state_id = State.find_by_name(params[:location_state]&.[]("value"))&.id if params[:location_state]
    search.location_range = params[:location_range]&.[]("value") || 10
    search.retail_wholesale = params[:retail_wholesale]&.[]("value") if params[:retail_wholesale]
    search.foreign_nationals_considered = params[:foreign_nationals_considered]&.[]("value") == "Yes" if params[:foreign_nationals_considered]

    search
  end

  def merge_attributes_from_params(params)
    Search.new_from_params(params)
          .attributes
          .except("id", "created_at", "updated_at", "discarded_at")
          .each { |attribute, value| self.send(attribute + "=", value) }

    self
  end

  def results
    base_query = Organization.includes(
        # :lending_parameter, organization_branches: [:postal_code, :state, :county]
        organization_branches: [:postal_code, :state, :county]
      # ).joins(
      #   :lending_parameter
      ).where(
        organization_type: "lender"
      ).where.not(
        organization_branches: { id: nil }
      )
      # ).where(
      #   'lending_parameters.minimum_loan_amount_cents >= ?', loan_amount_requested_cents
      # ).where(
      #   'lending_parameters.maximum_loan_amount_cents >= ?', loan_amount_requested_cents
      # ).where(
      #   'lending_parameters.property_types_financed && ?', "{ #{property_type_financed.join(',')} }"
      # )
    
    if location_range && location_postal_code
      base_query = base_query.where(
          'ST_DWithin(organization_branches.coordinates, :point, :distance)',
          { point: Geo.to_wkt(location_postal_code.point), distance: location_range * 1609.34 }
        ).order(
          Arel.sql(<<-SQL.squish
            ST_Distance(organization_branches.coordinates, ST_Geomfromtext(#{Geo.to_order_wkt(location_postal_code.point)})) DESC
          SQL
          )
        )
    end

    @results ||= base_query
  end
end
