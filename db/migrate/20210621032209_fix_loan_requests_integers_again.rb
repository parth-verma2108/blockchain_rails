# frozen_string_literal: true

class FixLoanRequestsIntegersAgain < ActiveRecord::Migration[6.1]
  def change
    change_column :loan_requests, :loan_amount_cents, :bigint
  end
end
