# frozen_string_literal: true

class User
  module Constants
    BORROWER_TYPE = 'borrower'
    BROKER_TYPE = 'broker'
    LENDER_TYPE = 'lender'
    ADMIN_TYPE = 'admin'

    TYPES = [
      BORROWER_TYPE,
      BROKER_TYPE,
      LENDER_TYPE
    ]

    MINIMUM_FIELDS_REQUIRED = [
      "type_of_institution".freeze,
      "direct_lender_mortgage_broker".freeze,
      # "retail_wholesale".freeze,
      "property_types_financed".freeze,
      "type_of_financing".freeze,
      "minimum_loan_amount_cents".freeze,
      "maximum_loan_amount_cents".freeze,
      "recourse".freeze
    ].freeze
  end
end
