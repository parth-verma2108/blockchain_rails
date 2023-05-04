# frozen_string_literal: true

class AddCoordinatesToOrganizationBranches < ActiveRecord::Migration[6.1]
  def change
    add_column :organization_branches, :coordinates, :st_point, geographic: true
    add_index :organization_branches, :coordinates, using: :gist
  end
end
