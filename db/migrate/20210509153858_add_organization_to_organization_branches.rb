# frozen_string_literal: true

class AddOrganizationToOrganizationBranches < ActiveRecord::Migration[6.1]
  def change
    add_reference :organization_branches, :organization, null: false, type: :uuid, foreign_key: true
  end
end
