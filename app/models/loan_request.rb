# frozen_string_literal: true

# == Schema Information
#
# Table name: loan_requests
#
#  id                                 :uuid             not null, primary key
#  user_id                            :uuid
#  search_id                          :uuid
#  loan_amount_cents                  :bigint
#  property_type                      :text
#  discarded_at                       :datetime
#  created_at                         :datetime         not null
#  updated_at                         :datetime         not null
#  location_city                      :string
#  borrower_name                      :string
#  borrower_mobile_number             :string
#  borrower_city                      :string
#  borrower_state_id                  :uuid
#  borrower_email                     :string
#  type_of_financing                  :text             default([]), is an Array
#  unit_quantity                      :bigint
#  net_rentable_square_feet           :bigint
#  physical_occupancy                 :float
#  year_built                         :bigint
#  tenant_concentration               :text
#  star_rating                        :string
#  property_comments                  :text
#  transaction_type                   :string
#  purchase_price                     :bigint
#  purchase_under_contract            :boolean
#  purchase_closing_date              :datetime
#  refinance_property_value           :bigint
#  refinance_outstanding_loan_balance :bigint
#  number_key_principals              :bigint
#  sponsor_combined_liquidity         :bigint
#  sponsor_combined_net_worth         :bigint
#  sponsor_combined_years_experience  :bigint
#  sponsor_credit_issues_disclosed    :string
#  sponsor_comments                   :text
#  transaction_summary                :text
#  submitted_at                       :datetime
#  location_state_id                  :uuid
#  location_postal_code_id            :uuid
#
class LoanRequest < ApplicationRecord
  include Discard::Model

  belongs_to :user
  belongs_to :search
  belongs_to :location_state, class_name: 'State', optional: true
  belongs_to :location_postal_code, class_name: 'PostalCode', optional: true
  belongs_to :borrower_state, class_name: 'State', optional: true

  has_many :loan_request_organizations
  has_many :organizations, through: :loan_request_organizations, source: :organization

  has_many :loan_request_quotes, -> { where.not(published_at: nil) }
  # has_many :loan_request_matches, -> { where.not(published_at: nil) }
  has_many :loan_request_matches

  has_many :matching_lending_parameters, ->(loan_request) {
    unscope(:where).where(
      "minimum_loan_amount_cents <= ? AND maximum_loan_amount_cents >= ? AND property_types_financed @> ARRAY[?]",
      loan_request.loan_amount_cents, loan_request.loan_amount_cents, loan_request.property_type
    ).joins(:lending_parameter_states).where(lending_parameter_states: { state_id: loan_request.location_state_id })
  }, class_name: 'LendingParameter'

  after_discard do
    loan_request_organizations.discard_all
  end

  after_undiscard do
    loan_request_organizations.undiscard_all
  end

  def manual_matching_lending_parameters
    LendingParameter.where(
      "minimum_loan_amount_cents <= ?", self.loan_amount_cents
    ).where(
      "maximum_loan_amount_cents <= ?", self.loan_amount_cents
    ).where(
      'property_types_financed && ?', "{ #{property_type} }"
    )
  end

  def generate_matches
    matching_lending_parameters.each do |lending_parameter|
      LoanRequestMatch.create(
        loan_request_id: self.id,
        user_id: lending_parameter.user_id,
        lending_parameter_id: lending_parameter.id
      ) unless self.loan_request_matches.find_by(lending_parameter_id: lending_parameter.id).present?
    end
  end

  def self.new_from_params(params)
    loan_request = LoanRequest.new(
      params.slice(
        :user_id,
        :loan_amount_cents,
        :location_city,
        :borrower_name,
        :borrower_mobile_number,
        :borrower_email,
        :borrower_city,
        :property_type,
        :type_of_financing,
        :unit_quantity,
        :net_rentable_square_feet,
        :physical_occupancy,
        :year_built,
        :tenant_concentration,
        :star_rating,
        :property_comments,
        :transaction_type,
        :purchase_price,
        :purchase_closing_date,
        :refinance_property_value,
        :refinance_outstanding_loan_balance,
        :number_key_principals,
        :sponsor_combined_liquidity,
        :sponsor_combined_net_worth,
        :sponsor_combined_years_experience,
        :sponsor_credit_issues_disclosed,
        :sponsor_comments,
        :transaction_summary
      ).compact_blank
    )

    loan_request.property_type = params[:property_type]&.[]("value") if params[:property_type]
    loan_request.location_postal_code_id = PostalCode.find_by_code(params[:location_postal_code])&.id if params[:location_postal_code].present?
    loan_request.location_state_id = State.find_by_name(params[:location_state]&.[]("value"))&.id if params[:location_state].present?
    loan_request.borrower_state_id = State.find_by_name(params[:borrower_state]&.[]("value"))&.id if params[:borrower_state].present?
    loan_request.purchase_under_contract = params[:purchase_under_contract]&.[]("value") == "Yes" if params[:purchase_under_contract].present?

    loan_request
  end

  def merge_attributes_from_params(params)
    LoanRequest.new_from_params(params)
          .attributes
          .except("id", "created_at", "updated_at", "discarded_at", "submitted_at")
          .each do |attribute, value| 
            self.send(attribute + "=", value)
          rescue StandardError => error
            # TODO: Bugsnag
          end

    self
  rescue StandardError => error
    # TODO: Bugsnag
  end

  def submit
    update(submitted_at: DateTime.now)
  end

  def add_loan_request_organizations(organization_ids)
    existing_loan_request_organizations_ids = self.loan_request_organizations.ids

    organization_ids.each do |organization_id|
      next if existing_loan_request_organizations_ids.include?(organization_id)

      LoanRequestOrganization.create!(
        loan_request_id: self.id,
        organization_id: organization_id,
        submitted_at: self.submitted_at
      )
    end
  end
end
