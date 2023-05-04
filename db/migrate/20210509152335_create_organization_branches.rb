# frozen_string_literal: true

class CreateOrganizationBranches < ActiveRecord::Migration[6.1]
  def change
    add_column :counties, :uuid, :uuid, default: "gen_random_uuid()", null: false

    change_table :counties do |t|
      t.remove :id
      t.rename :uuid, :id
    end
    execute "ALTER TABLE counties ADD PRIMARY KEY (id);"

    create_table :organization_branches, id: :uuid do |t|
      t.string :name
      t.string :street
      t.string :city
      t.references :postal_code, null: false, foreign_key: true, type: :uuid
      t.references :state, null: false, foreign_key: true, type: :uuid
      t.references :county, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
