# frozen_string_literal: true

class CreateOrganizations < ActiveRecord::Migration[6.1]
  def change
    create_table :organizations, id: :uuid do |t|
      t.string :organization_type
      t.string :name
      t.string :website

      t.timestamps
    end
  end
end
