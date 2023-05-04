# frozen_string_literal: true

module Authenticated::Admin
  class LoanRequestsController < Authenticated::AdminController
    def index
    end

    def new
    end

    def show
      @loan_request = LoanRequest.all.find(params[:id])
    end

    def edit
      @loan_request = LoanRequest.all.find(params[:id])
    end
  end
end
