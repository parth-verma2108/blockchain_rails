# frozen_string_literal: true

class AddSearchColumns < ActiveRecord::Migration[6.1]
  def change
    add_column :searches, :location_city, :string
    add_reference :searches, :location_postal_code, type: :uuid, null: true
    add_reference :searches, :location_state, type: :uuid, null: true
    add_column :searches, :property_type_financed, :text, array: true, default: []
    add_column :searches, :location_range, :bigint
    add_column :searches, :type_of_institution, :text, array: true, default: []
    add_column :searches, :direct_lender_mortgage_broker, :string
    add_column :searches, :retail_wholesale, :string
    add_column :searches, :type_of_financing, :text, array: true, default: []
    add_column :searches, :recourse, :text, array: true, default: []
    add_column :searches, :foreign_nationals_considered, :boolean
  end
end
