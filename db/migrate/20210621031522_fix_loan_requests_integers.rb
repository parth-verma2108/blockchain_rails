# frozen_string_literal: true

class FixLoanRequestsIntegers < ActiveRecord::Migration[6.1]
  def change
    change_column :loan_requests, :unit_quantity, :bigint
    change_column :loan_requests, :net_rentable_square_feet, :bigint
    change_column :loan_requests, :year_built, :bigint
    change_column :loan_requests, :purchase_price, :bigint
    change_column :loan_requests, :refinance_property_value, :bigint
    change_column :loan_requests, :refinance_outstanding_loan_balance, :bigint
    change_column :loan_requests, :number_key_principals, :bigint
    change_column :loan_requests, :sponsor_combined_liquidity, :bigint
    change_column :loan_requests, :sponsor_combined_net_worth, :bigint
    change_column :loan_requests, :sponsor_combined_years_experience, :bigint

    remove_column :loan_requests, :location_state_id
    remove_column :loan_requests, :location_postal_code_id

    add_reference :loan_requests, :location_state, type: :uuid, null: true
    add_reference :loan_requests, :location_postal_code, type: :uuid, null: true
  end
end
