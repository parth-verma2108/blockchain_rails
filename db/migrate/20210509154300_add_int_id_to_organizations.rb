# frozen_string_literal: true

class AddIntIdToOrganizations < ActiveRecord::Migration[6.1]
  def change
    add_column :organizations, :int_id, :bigint, index: true
  end
end
