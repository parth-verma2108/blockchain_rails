# frozen_string_literal: true

class AddDiscardedAtToSearches < ActiveRecord::Migration[6.1]
  def change
    add_column :searches, :discarded_at, :datetime
    add_index :searches, :discarded_at
  end
end
