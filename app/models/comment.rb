# frozen_string_literal: true

# == Schema Information
#
# Table name: comments
#
#  id           :uuid             not null, primary key
#  subject_type :string
#  subject_id   :uuid
#  user_id      :uuid
#  body         :text
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  subject      :text
#

class Comment < ApplicationRecord
  belongs_to :subject
  has_many :comments, as: :subject
  has_many :likes, as: :subject
end
