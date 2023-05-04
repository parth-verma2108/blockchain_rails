# frozen_string_literal: true

module Authenticated
  class LenderController < Authenticated::BaseController
    before_action :authenticate_lender!

    private

    def authenticate_lender!
      head :unauthorized unless current_user&.lender?
    end
  end
end
