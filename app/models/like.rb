# frozen_string_literal: true

# == Schema Information
#
# Table name: likes
#
#  id           :uuid             not null, primary key
#  subject_type :string
#  subject_id   :uuid
#  user_id      :uuid
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Like < ApplicationRecord
  belongs_to :subject
end
