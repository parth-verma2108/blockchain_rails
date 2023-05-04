# frozen_string_literal: true

# == Schema Information
#
# Table name: regions
#
#  id         :uuid             not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Region < ApplicationRecord
  has_many :states
end
