# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                     :uuid             not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :inet
#  last_sign_in_ip        :inet
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  user_type              :string
#  kickoff_url            :string
#
class User < ApplicationRecord
  include Constants
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :trackable

  has_many :searches
  has_many :user_saved_organizations
  has_many :saved_organizations, through: :user_saved_organizations, source: :organization
  has_many :loan_requests

  has_one :lending_parameter
  has_one :profile

  before_create :build_default_lending_parameter
  before_create :build_profile

  def trigger_set_password
    token = self.send(:set_reset_password_token)

    DeviseMailer.set_password_instructions(self, token).deliver_now
  end

  def borrower?
    user_type == BORROWER_TYPE || user_type == BROKER_TYPE
  end

  def lender?
    user_type == LENDER_TYPE
  end

  def admin?
    user_type == ADMIN_TYPE
  end

  def build_default_lending_parameter
    return true unless lender?

    build_lending_parameter
    true
  end
end
