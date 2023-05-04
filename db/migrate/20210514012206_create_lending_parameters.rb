# frozen_string_literal: true

class CreateLendingParameters < ActiveRecord::Migration[6.1]
  def change
    create_table :lending_parameters do |t|
      t.references :organization, null: false, type: :uuid, foreign_key: true
      t.text :property_types_financed, array: true
      t.integer :minimum_loan_amount_cents, index: true
      t.integer :maximum_loan_amount_cents, index: true
      t.timestamps
    end

    add_index :lending_parameters, :property_types_financed, using: 'gin'
  end
end
