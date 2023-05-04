# frozen_string_literal: true

# == Schema Information
#
# Table name: states
#
#  id           :uuid             not null, primary key
#  name         :string
#  abbreviation :string
#  region_id    :uuid
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class State < ApplicationRecord
  belongs_to :region
  has_many :counties, dependent: :destroy
  has_many :organization_branches, dependent: :destroy
end
