# frozen_string_literal: true

# == Schema Information
#
# Table name: lending_parameters
#
#  property_types_financed       :text             is an Array
#  minimum_loan_amount_cents     :bigint
#  maximum_loan_amount_cents     :bigint
#  created_at                    :datetime         not null
#  updated_at                    :datetime         not null
#  id                            :uuid             not null, primary key
#  type_of_institution           :text             default([]), is an Array
#  recourse                      :text             default([]), is an Array
#  type_of_financing             :text             default([]), is an Array
#  elevator_pitch                :text
#  comments                      :text
#  user_id                       :uuid             not null
#  direct_lender_mortgage_broker :text             default([]), is an Array
#  retail_wholesale              :text             default([]), is an Array
#

class LendingParameter < ApplicationRecord
  include Constants

  # validates :property_types_financed, inclusion: { in: PROPERTY_TYPES_FINANCED }
  # validates :minimum_loan_amount_cents, numericality: { greater_than: 100, less_than_or_equal_to: :maximum_loan_amount_cents }
  # validates :maximum_loan_amount_cents, numericality: { greater_than_or_equal_to: :minimum_loan_amount_cents }

  belongs_to :user

  has_many :lending_parameter_states
  has_many :states, through: :lending_parameter_states

  def minimum_complete?
    missing_minimum_fields.none?
  end

  def missing_minimum_fields
    missing = missing_fields(MINIMUM_FIELDS_REQUIRED)
    missing << "states" unless lending_parameter_states.exists?

    missing
  end

  def missing_fields(fields)
    missing = []

    fields.each do |field|
      missing << field unless self.send(field).present?
    end

    missing
  end
end
