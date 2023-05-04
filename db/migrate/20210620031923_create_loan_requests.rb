# frozen_string_literal: true

class CreateLoanRequests < ActiveRecord::Migration[6.1]
  def change
    create_table :loan_requests, id: :uuid do |t|
      t.references :user, index: true, type: :uuid
      t.references :search, index: true, type: :uuid

      t.integer :loan_amount_cents, index: true
      t.text :property_type

      t.string :street_address
      t.string :city
      t.references :location_state
      t.references :location_postal_code

      t.datetime :discarded_at, index: true
      t.timestamps
    end

    create_table :loan_request_organizations, id: :uuid do |t|
      t.references :loan_request, index: true, type: :uuid
      t.references :organization, index: true, type: :uuid
      t.datetime :discarded_at, index: true
      t.timestamps
    end
  end
end
