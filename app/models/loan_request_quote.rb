# frozen_string_literal: true

# == Schema Information
#
# Table name: loan_request_quotes
#
#  id                   :uuid             not null, primary key
#  loan_request_id      :uuid
#  user_id              :uuid
#  organization_id      :uuid
#  loan_amount          :string
#  interest_rate        :string
#  fixed_or_floating    :string
#  term                 :string
#  amortization         :string
#  interest_only_period :string
#  prepayment_penalty   :string
#  origination_fee      :string
#  recourse             :string
#  published_at         :datetime
#  interested_at        :datetime
#  not_interested_at    :datetime
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#
class LoanRequestQuote < ApplicationRecord
  belongs_to :loan_request
  belongs_to :user, optional: true
  belongs_to :organization, optional: true

  def mark_interested
    update(interested_at: DateTime.now, not_interested_at: nil)
  end

  def mark_not_interested
    update(interested_at: nil, not_interested_at: DateTime.now)
  end
end
