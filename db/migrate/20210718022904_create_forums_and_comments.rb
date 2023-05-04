# frozen_string_literal: true

class CreateForumsAndComments < ActiveRecord::Migration[6.1]
  def change
    create_table :forums, id: :uuid do |t|
      t.text :title
    end

    create_table :comments, id: :uuid do |t|
      t.references :subject, index: true, type: :uuid, polymorphic: true
      t.references :user, index: true, type: :uuid
      t.text :body
      t.timestamps
    end

    create_table :likes, id: :uuid do |t|
      t.references :subject, index: true, type: :uuid, polymorphic: true
      t.references :user, index: true, type: :uuid
      t.timestamps
    end
  end
end
