# frozen_string_literal: true

module Authenticated::Admin::Api
  class PasswordsController < Authenticated::AdminController
    def create
      user = User.find(params[:user_id])

      if user.trigger_set_password
        head :no_content
      else
        head :unprocessable_entity
      end
    end
  end
end 
