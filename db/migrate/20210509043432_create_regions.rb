# frozen_string_literal: true

class CreateRegions < ActiveRecord::Migration[6.1]
  def change
    create_table :regions, id: :uuid do |t|
      t.string :name

      t.timestamps
    end
  end
end
