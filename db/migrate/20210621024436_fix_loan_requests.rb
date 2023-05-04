# frozen_string_literal: true

class FixLoanRequests < ActiveRecord::Migration[6.1]
  def change
    remove_column :loan_requests, :street_address
    remove_column :loan_requests, :city
    add_column :loan_requests, :location_city, :string

    add_column :loan_requests, :borrower_name, :string
    add_column :loan_requests, :borrower_mobile_number, :string
    add_column :loan_requests, :borrower_city, :string

    add_reference :loan_requests, :borrower_state, type: :uuid, null: true

    add_column :loan_requests, :borrower_email, :string

    add_column :loan_requests, :type_of_financing, :text, array: true, default: []

    add_column :loan_requests, :unit_quantity, :integer

    add_column :loan_requests, :net_rentable_square_feet, :integer

    add_column :loan_requests, :physical_occupancy, :float

    add_column :loan_requests, :year_built, :integer

    add_column :loan_requests, :tenant_concentration, :text

    add_column :loan_requests, :star_rating, :string

    add_column :loan_requests, :property_comments, :text

    add_column :loan_requests, :transaction_type, :string

    add_column :loan_requests, :purchase_price, :integer
    add_column :loan_requests, :purchase_under_contract, :boolean
    add_column :loan_requests, :purchase_closing_date, :datetime

    add_column :loan_requests, :refinance_property_value, :integer

    add_column :loan_requests, :refinance_outstanding_loan_balance, :integer

    add_column :loan_requests, :number_key_principals, :integer
    add_column :loan_requests, :sponsor_combined_liquidity, :integer
    add_column :loan_requests, :sponsor_combined_net_worth, :integer
    add_column :loan_requests, :sponsor_combined_years_experience, :integer

    add_column :loan_requests, :sponsor_credit_issues_disclosed, :string
    add_column :loan_requests, :sponsor_comments, :text
    add_column :loan_requests, :transaction_summary, :text

    add_column :loan_requests, :submitted_at, :datetime

    add_column :loan_request_organizations, :submitted_at, :datetime
  end
end
