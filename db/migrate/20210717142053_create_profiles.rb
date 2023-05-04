# frozen_string_literal: true

class CreateProfiles < ActiveRecord::Migration[6.1]
  def change
    create_table :profiles, id: :uuid do |t|
      t.references :user, index: true, type: :uuid
      t.string :first_name
      t.string :last_name
      t.references :state, index: true, type: :uuid
      t.string :office_phone
      t.string :cellular_phone
      t.string :company_name
      t.string :title
      t.timestamps
    end
  end
end
