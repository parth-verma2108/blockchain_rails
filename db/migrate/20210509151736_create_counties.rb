# frozen_string_literal: true

class CreateCounties < ActiveRecord::Migration[6.1]
  def change
    create_table :counties do |t|
      t.string :name
      t.references :state, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
