class CreateLoanRequestMatches < ActiveRecord::Migration[6.1]
  def change
    create_table :loan_request_matches, id: :uuid do |t|
      t.references :loan_request, index: true, type: :uuid
      t.references :user, index: true, type: :uuid
      t.references :organization, index: true, type: :uuid
      t.references :lending_parameter, index: true, type: :uuid

      t.datetime :published_at
      t.datetime :interested_at
      t.datetime :not_interested_at

      t.timestamps
    end
  end
end
