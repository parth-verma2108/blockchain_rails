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

class LendingParameterSerializer < BaseSerializer
  attributes :property_types_financed, :minimum_loan_amount_cents, :maximum_loan_amount_cents
  attributes :created_at, :updated_at, :id, :type_of_institution, :recourse
  attributes :type_of_financing, :elevator_pitch, :comments, :direct_lender_mortgage_broker
  attributes :retail_wholesale, :user_id

  # attribute :property_types_financed do |lending_parameter|
  #   { value: lending_parameter.property_types_financed }
  # end


  # attribute :direct_lender_mortgage_broker do |lending_parameter|
  #   { value: lending_parameter.direct_lender_mortgage_broker }
  # end


  # attribute :type_of_financing do |lending_parameter|
  #   { value: lending_parameter.type_of_financing }
  # end


  # attribute :type_of_institution do |lending_parameter|
  #   { value: lending_parameter.type_of_institution }
  # end

  # attribute :recourse do |lending_parameter|
  #   { value: lending_parameter.recourse }
  # end

  # attribute :retail_wholesale do |lending_parameter|
  #   { value: lending_parameter.retail_wholesale }
  # end

  attribute :lending_states do |lending_parameter|
    lending_parameter.states.map(&:name)
  end

  attribute :minimum_loan_amount do |lending_parameter|
    lending_parameter.minimum_loan_amount_cents / 100
  end

  attribute :maximum_loan_amount do |lending_parameter|
    lending_parameter.maximum_loan_amount_cents / 100
  end

  attribute :first_name do |lending_parameter|
    lending_parameter.user.profile.first_name
  end

  attribute :last_name do |lending_parameter|
    lending_parameter.user.profile.last_name
  end

  attribute :company_name do |lending_parameter|
    lending_parameter.user.profile.company_name
  end

  attribute :email do |lending_parameter|
    lending_parameter.user.email
  end
end
