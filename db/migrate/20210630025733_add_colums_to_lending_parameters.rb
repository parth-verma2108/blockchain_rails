# frozen_string_literal: true

class AddColumsToLendingParameters < ActiveRecord::Migration[6.1]
  def change
    add_column :lending_parameters, :type_of_institution, :text, array: true, default: []
    add_column :lending_parameters, :direct_lender_mortgage_broker, :string
    add_column :lending_parameters, :retail_wholesale, :string
    add_column :lending_parameters, :recourse, :text, array: true, default: []
    add_column :lending_parameters, :type_of_financing, :text, array: true, default: []
    add_column :lending_parameters, :elevator_pitch, :text
    add_column :lending_parameters, :comments, :text

    create_table :lending_parameter_states, id: :uuid do |t|
      t.references :state, index: true, type: :uuid
      t.references :lending_parameter, index: true, type: :uuid

      t.timestamps
    end
  end
end
