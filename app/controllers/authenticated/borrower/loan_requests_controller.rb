# frozen_string_literal: true

module Authenticated::Borrower
  class LoanRequestsController < Authenticated::BorrowerController
    def index
    end

    def new
    end

    def show
      @loan_request = current_user.loan_requests.find(params[:id])
    end

    def edit
      @loan_request = current_user.loan_requests.find(params[:id])
    end
  end 
end 
