# frozen_string_literal: true

class AddSubjectToComments < ActiveRecord::Migration[6.1]
  def change
    add_column :comments, :subject, :text
  end
end
