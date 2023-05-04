# frozen_string_literal: true

# == Schema Information
#
# Table name: forums
#
#  id    :uuid             not null, primary key
#  title :text
#

class Forum < ApplicationRecord
  has_many :comments, as: :subject
end
