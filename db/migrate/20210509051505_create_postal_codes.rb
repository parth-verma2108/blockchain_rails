# frozen_string_literal: true

class CreatePostalCodes < ActiveRecord::Migration[6.1]
  def change
    create_table :postal_codes, id: :uuid do |t|
      t.references :state, index: true, type: :uuid
      t.string :code, null: false
      t.st_point :coordinates, null: false, geographic: true
      t.float :longitude, null: false
      t.float :latitude, null: false
      t.timestamps

      t.index :coordinates, using: :gist
      t.index %i[latitude longitude]
    end
  end
end
