# frozen_string_literal: true

namespace :communication do
  task introduction_email_drip: :environment do
    # two_days_ago_range = 2.days.ago.beginning_of_day..2.days.ago.end_of_day
    # three_days_ago_range = 3.days.ago.beginning_of_day..3.days.ago.end_of_day

    # User.where(created_at: two_days_ago_range, user_type: ['borrower', 'broker']).find_each do |user|
    #   UserMailer.borrower_first_check_in(user.id).deliver_later
    # end

    # User.where(created_at: three_days_ago_range, user_type: ['borrower', 'broker']).find_each do |user|
    #   UserMailer.borrower_second_check_in(user.id).deliver_later
    # end
  end
end 
