# frozen_string_literal: true

# == Schema Information
#
# Table name: user_saved_organizations
#
#  id              :uuid             not null, primary key
#  user_id         :uuid
#  organization_id :uuid
#  search_id       :uuid
#  discarded_at    :datetime
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class UserSavedOrganization < ApplicationRecord
  include Discard::Model

  default_scope -> { kept }

  belongs_to :user
  belongs_to :organization
  belongs_to :search
end
