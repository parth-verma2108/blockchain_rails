# frozen_string_literal: true

# == Schema Information
#
# Table name: lending_parameter_states
#
#  id                   :uuid             not null, primary key
#  state_id             :uuid
#  lending_parameter_id :uuid
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#
class LendingParameterState < ApplicationRecord
  belongs_to :lending_parameter
  belongs_to :state
end
