# frozen_string_literal: true

class ConvertIntegerToBigInt < ActiveRecord::Migration[6.1]
  def change
    change_column :lending_parameters, :minimum_loan_amount_cents, :bigint
    change_column :lending_parameters, :maximum_loan_amount_cents, :bigint
  end
end
