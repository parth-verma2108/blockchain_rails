# frozen_string_literal: true

module Authenticated
  class BorrowerController < Authenticated::BaseController
    before_action :authenticate_borrower!

    private

    def authenticate_borrower!
      head :unauthorized unless current_user&.borrower?
    end
  end
end
