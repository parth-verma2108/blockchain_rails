# frozen_string_literal: true

# == Schema Information
#
# Table name: loan_request_organizations
#
#  id              :uuid             not null, primary key
#  loan_request_id :uuid
#  organization_id :uuid
#  discarded_at    :datetime
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  submitted_at    :datetime
#
class LoanRequestOrganization < ApplicationRecord
  include Discard::Model

  belongs_to :loan_request
  belongs_to :organization
end
