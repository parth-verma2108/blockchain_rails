# frozen_string_literal: true

module Borrower
  class SearchSerializer < BaseSerializer
    # cache_options store: Rails.cache, namespace: 'jsonapi-serializer', expires_in: 1.hour

    attributes :user_id, :name, :location_city, :property_type_financed, :type_of_institution
    attributes :direct_lender_mortgage_broker, :type_of_financing, :recourse
    attributes :loan_amount_requested_cents, :direct_lender_mortgage_broker
    attributes :location_range, :retail_wholesale, :foreign_nationals_considered
    attributes :created_at, :updated_at, :id

    attribute :postal_code do |search|
      search.location_postal_code&.code
    end

    attribute :postal_code_longitude do |search|
      search.location_postal_code&.longitude
    end

    attribute :postal_code_latitude do |search|
      search.location_postal_code&.latitude
    end

    attribute :location_state do |search|
      search.location_state&.name
    end

    attribute :location_state_abbreviation do |search|
      search.location_state&.abbreviation
    end

    attribute :edit_path do |search|
      url_helpers.lenders_search_edit_path(id: search.id)
    end
  end
end