# frozen_string_literal: true

class SessionSerializer < BaseSerializer
  attributes :email

  attribute :destroy_user_session_path do
    url_helpers.destroy_user_session_path
  end

  attribute :user_type do |user|
    [User::Constants::BORROWER_TYPE, User::Constants::BROKER_TYPE].include?(user.user_type) ? "borrower" : user.user_type
  end

  attribute :lending_parameters, if: Proc.new { |user|
    user.lender?
  } do |user|
    user
      .lending_parameter
      &.attributes
      &.except("created_at", "updated_at", "user_id", "id")
      &.transform_keys do |key|
        key.camelize(:lower)
      end
  end

  attribute :lending_parameters_minimum, if: Proc.new { |user|
    user.lender?
  } do |user|
    user.lending_parameter&.minimum_complete?
  end

  attribute :profile_minimum, if: Proc.new { |user|
    user.borrower? || user.admin?
  } do |user|
    user.profile&.minimum_complete?
  end

  attribute :profile do |user|
    (user.profile || {})
  end

  attribute :profile_state do |user|
    user.profile&.state&.name
  end
end
