# frozen_string_literal: true

class CreateStates < ActiveRecord::Migration[6.1]
  def change
    create_table :states, id: :uuid do |t|
      t.string :name
      t.string :abbreviation
      t.references :region, index: true, type: :uuid

      t.timestamps
    end
  end
end
