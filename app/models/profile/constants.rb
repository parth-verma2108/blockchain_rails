# frozen_string_literal: true

class Profile
  module Constants
    MINIMUM_FIELDS_REQUIRED = [
      "first_name".freeze,
      "last_name".freeze,
      "state_id".freeze,
      "company_name".freeze
    ].freeze
  end
end
