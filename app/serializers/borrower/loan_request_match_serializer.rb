# frozen_string_literal: true

module Borrower
  class LoanRequestMatchSerializer < BaseSerializer
    include ::UuidShortener

    attributes :id, :loan_request_id
    attributes :published_at, :interested_at
    attributes :not_interested_at, :updated_at

    attribute :short_id do |loan_request_match|
      # UuidShortener.short_id(loan_request_match.id)
      loan_request_match.id
    end

    attribute :bank_name do |loan_request_match|
      loan_request_match.lending_parameter.user.profile.company_name
    end

    attribute :minimum_loan_amount_cents do |loan_request_match|
      loan_request_match.lending_parameter.minimum_loan_amount_cents
    end

    attribute :maximum_loan_amount_cents do |loan_request_match|
      loan_request_match.lending_parameter.maximum_loan_amount_cents
    end

    attribute :type_of_financing do |loan_request_match|
      loan_request_match.lending_parameter.type_of_financing.join(", ")
    end
  end
end
