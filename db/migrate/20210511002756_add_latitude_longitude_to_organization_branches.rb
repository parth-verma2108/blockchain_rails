# frozen_string_literal: true

class AddLatitudeLongitudeToOrganizationBranches < ActiveRecord::Migration[6.1]
  def change
    add_column :organization_branches, :longitude, :float
    add_column :organization_branches, :latitude, :float

    add_index :organization_branches, %i[latitude longitude]
  end
end
