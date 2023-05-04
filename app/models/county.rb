# frozen_string_literal: true

# == Schema Information
#
# Table name: counties
#
#  name       :string
#  state_id   :uuid             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  id         :uuid             not null, primary key
#
class County < ApplicationRecord
  belongs_to :state
  has_many :organization_branches
end
