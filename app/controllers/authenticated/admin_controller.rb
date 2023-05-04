# frozen_string_literal: true

module Authenticated
  class AdminController < Authenticated::BaseController
    before_action :authenticate_admin!

    private

    def authenticate_admin!
      head :unauthorized unless current_user&.admin?
    end
  end
end
