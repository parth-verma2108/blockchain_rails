# frozen_string_literal: true

# == Schema Information
#
# Table name: profiles
#
#  id             :uuid             not null, primary key
#  user_id        :uuid
#  first_name     :string
#  last_name      :string
#  state_id       :uuid
#  office_phone   :string
#  cellular_phone :string
#  company_name   :string
#  title          :string
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class Profile < ApplicationRecord
  include Constants

  belongs_to :user
  belongs_to :state

  def full_name
    first_name + " " + last_name
  end

  def minimum_complete?
    return true if user.lender?

    missing_minimum_fields.none?
  end

  def missing_minimum_fields
    missing = missing_fields(MINIMUM_FIELDS_REQUIRED)

    missing
  end

  def missing_fields(fields)
    missing = []

    fields.each do |field|
      missing << field unless self.send(field).present?
    end

    missing
  end
end
