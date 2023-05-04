# frozen_string_literal: true

class RemoveOrganizationsFromLendingParameters < ActiveRecord::Migration[6.1]
  def change
    remove_reference :lending_parameters, :organization
  end
end
