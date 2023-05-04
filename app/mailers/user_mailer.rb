# frozen_string_literal: true

class UserMailer < ApplicationMailer
  default from: 'Tony Talamas <tony@lenderprism.com>'

  def new_registration(user_id)
    @user = User.find user_id

    mail to: @user.email,
      subject: "Welcome to LenderPrism! Let's get started"
  end

  def borrower_first_check_in(user_id)
    @user = User.find user_id

    mail to: @user.email,
      subject: "LenderPrism helps you connect with thousands of lenders"
  end

  def borrower_second_check_in(user_id)
    @user = User.find user_id

    mail to: @user.email,
      subject: "Find the right lender for any deal with LenderPrism"
  end
end
