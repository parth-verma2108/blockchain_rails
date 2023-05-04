# frozen_string_literal: true

class CreateSearches < ActiveRecord::Migration[6.1]
  def change
    add_column :lending_parameters, :uuid, :uuid, default: "gen_random_uuid()", null: false

    change_table :lending_parameters do |t|
      t.remove :id
      t.rename :uuid, :id
    end
    execute "ALTER TABLE lending_parameters ADD PRIMARY KEY (id);"

    create_table :searches, id: :uuid do |t|
      t.references :user, null: false, type: :uuid, foreign_key: true
      t.text :property_types_financed, array: true
      t.integer :minimum_loan_amount_cents, index: true
      t.integer :maximum_loan_amount_cents, index: true
      t.timestamps
    end
  end
end
