# frozen_string_literal: true

class LendingParameter
  module Constants
    ASSISTED_LIVING_MEMORY_CARE = "Assisted Living / Memory Care".freeze
    HOTEL_MOTEL = "Hotel/Motel".freeze
    INDUSTRIAL = "Industrial".freeze
    LAND = "Land".freeze
    MANUFACTURED_HOUSING_MOBILE_HOME_PARK = "Manufactured Housing / Mobile Home Park".freeze
    MARINA = "Marina".freeze
    MEDICAL_OFFICE = "Medical Office".freeze
    MIXED_USE = "Mixed-Use".freeze
    MULTIFAMILY = "Multifamily".freeze
    NURSING_FACILITY = "Nursing Facility".freeze
    OFFICE_MULTI_TENANT = "Office-Multi Tenant".freeze
    OFFICE_SINGLE_TENANT = "Office-Single Tenant".freeze
    OFFICE_OWNER_USER = "Office-Owner/User".freeze
    OTHER = "Other".freeze
    RETAIL_MULTI_TENANT = "Retail-Multi Tenant".freeze
    RETAIL_SINGLE_TENANT = "Retail-Single Tenant".freeze
    RV_PARK = "RV Park".freeze
    SELF_STORAGE = "Self-Storage".freeze
    SENIOR_HOUSING = "Senior Housing".freeze
    SINGLE_FAMILY_RENTALS_1_4_UNITS = "Single-Family Rentals (1-4 Units)".freeze
    STUDENT_HOUSING = "Student Housing".freeze

    PROPERTY_TYPES_FINANCED = [
      ASSISTED_LIVING_MEMORY_CARE,
      HOTEL_MOTEL,
      INDUSTRIAL,
      LAND,
      MANUFACTURED_HOUSING_MOBILE_HOME_PARK,
      MARINA,
      MEDICAL_OFFICE,
      MIXED_USE,
      MULTIFAMILY,
      NURSING_FACILITY,
      OFFICE_MULTI_TENANT,
      OFFICE_SINGLE_TENANT,
      OFFICE_OWNER_USER,
      OTHER,
      RETAIL_MULTI_TENANT,
      RETAIL_SINGLE_TENANT,
      RV_PARK,
      SELF_STORAGE,
      SENIOR_HOUSING,
      SINGLE_FAMILY_RENTALS_1_4_UNITS,
      STUDENT_HOUSING
    ].freeze

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
