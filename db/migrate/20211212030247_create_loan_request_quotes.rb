class CreateLoanRequestQuotes < ActiveRecord::Migration[6.1]
  def change
    create_table :loan_request_quotes, id: :uuid do |t|
      t.references :loan_request, index: true, type: :uuid
      t.references :user, index: true, type: :uuid
      t.references :organization, index: true, type: :uuid

      t.string :loan_amount
      t.string :interest_rate
      t.string :fixed_or_floating
      t.string :term
      t.string :amortization
      t.string :interest_only_period
      t.string :prepayment_penalty
      t.string :origination_fee
      t.string :recourse
     
      t.datetime :published_at
      t.datetime :interested_at
      t.datetime :not_interested_at

      t.timestamps
    end
  end
end
