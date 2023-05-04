# frozen_string_literal: true

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception, prepend: true

  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up) do |user_params|
      user_params.permit(:user_type, :email, :password)
    end

    devise_parameter_sanitizer.permit(:account_update) do |user_params|
      user_params.permit(:first_name, :last_name, :email, :password, :current_password)
    end
  end
end
