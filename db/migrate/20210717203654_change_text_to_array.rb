# frozen_string_literal: true

class ChangeTextToArray < ActiveRecord::Migration[6.1]
  def change
    remove_column :lending_parameters, :direct_lender_mortgage_broker
    remove_column :lending_parameters, :retail_wholesale

    add_column :lending_parameters, :direct_lender_mortgage_broker, :text, array: true, default: []
    add_column :lending_parameters, :retail_wholesale, :text, array: true, default: []
  end
end
