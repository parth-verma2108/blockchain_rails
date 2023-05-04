# frozen_string_literal: true

class FixSearchParams < ActiveRecord::Migration[6.1]
  def change
    add_column :searches, :name, :string
    add_column :searches, :loan_amount_requested_cents, :bigint
    remove_column :searches, :minimum_loan_amount_cents
    remove_column :searches, :maximum_loan_amount_cents
  end
end
