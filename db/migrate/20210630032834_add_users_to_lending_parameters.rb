# frozen_string_literal: true

class AddUsersToLendingParameters < ActiveRecord::Migration[6.1]
  def change
    add_reference :lending_parameters, :user, type: :uuid, null: false
  end
end
