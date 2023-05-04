# frozen_string_literal: true

class CreateUserSavedOrganizations < ActiveRecord::Migration[6.1]
  def change
    create_table :user_saved_organizations, id: :uuid do |t|
      t.references :user, index: true, type: :uuid
      t.references :organization, index: true, type: :uuid
      t.references :search, index: true, type: :uuid

      t.datetime :discarded_at, index: true
      t.timestamps
    end

    add_index :user_saved_organizations, %i[user_id search_id]
    add_index :user_saved_organizations, %i[user_id organization_id]
    add_index :user_saved_organizations, %i[search_id organization_id]
    add_index :user_saved_organizations, %i[organization_id search_id]
  end
end
