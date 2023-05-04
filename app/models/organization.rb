# frozen_string_literal: true

# == Schema Information
#
# Table name: organizations
#
#  id                :uuid             not null, primary key
#  organization_type :string
#  name              :string
#  website           :string
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  int_id            :bigint
#  fdic_cert         :string
#
class Organization < ApplicationRecord
  has_many :organization_branches
end
