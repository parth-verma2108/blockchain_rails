# frozen_string_literal: true

module Borrower
  class LoanRequestSerializer < BaseSerializer
    attributes :id, :user_id, :search_id, :loan_amount_cents, :created_at, :updated_at, :submitted_at
    attributes :property_type, :location_city, :borrower_name, :borrower_mobile_number
    attributes :borrower_city, :borrower_email, :type_of_financing, :unit_quantity
    attributes :net_rentable_square_feet, :physical_occupancy, :year_built, :tenant_concentration
    attributes :star_rating, :property_comments, :transaction_type, :purchase_price
    attributes :purchase_under_contract, :purchase_closing_date, :refinance_property_value
    attributes :refinance_outstanding_loan_balance, :number_key_principals, :sponsor_combined_liquidity
    attributes :sponsor_combined_net_worth, :sponsor_combined_years_experience
    attributes :sponsor_credit_issues_disclosed, :sponsor_comments, :transaction_summary

    attribute :postal_code do |loan_request|
      loan_request.location_postal_code&.code
    end

    attribute :postal_code_longitude do |loan_request|
      loan_request.location_postal_code&.longitude
    end

    attribute :postal_code_latitude do |loan_request|
      loan_request.location_postal_code&.latitude
    end

    attribute :location_state do |loan_request|
      loan_request.location_state&.name
    end

    attribute :location_state_abbreviation do |loan_request|
      loan_request.location_state&.abbreviation
    end

    attribute :borrower_state do |loan_request|
      loan_request.borrower_state&.name
    end

    attribute :borrower_state_abbreviation do |loan_request|
      loan_request.borrower_state&.abbreviation
    end

    attribute :edit_path do |loan_request|
      url_helpers.loan_request_edit_path(id: loan_request.id)
    end

    attribute :show_path do |loan_request|
      url_helpers.loan_request_show_path(id: loan_request.id)
    end

    attribute :purchase_closing_date do |loan_request|
      loan_request.purchase_closing_date&.strftime("%m/%d/%Y")
    end

    attribute :selected_lenders do |loan_request|
      loan_request.loan_request_organizations.map(&:organization_id)
    end

    attribute :status do |loan_request|
      # if loan_request.closed_at
      if false
        'closed'
      elsif loan_request.loan_request_quotes.any?
        'quoting'
      elsif loan_request.submitted_at
        'processing'
      else
        'draft'
      end
    end
  end
end
