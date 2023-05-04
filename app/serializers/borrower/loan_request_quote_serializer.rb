# frozen_string_literal: true

module Borrower
  class LoanRequestQuoteSerializer < BaseSerializer
    include ::UuidShortener

    attributes :id, :loan_request_id, :user_id, :organization_id
    attributes :loan_amount, :interest_rate, :fixed_or_floating
    attributes :term, :amortization, :interest_only_period, :prepayment_penalty
    attributes :origination_fee, :recourse, :published_at, :interested_at
    attributes :not_interested_at, :updated_at

    attribute :short_id do |loan_request_quote|
      # UuidShortener.short_id(loan_request_quote.id)
      loan_request_quote.id
    end
  end
end
