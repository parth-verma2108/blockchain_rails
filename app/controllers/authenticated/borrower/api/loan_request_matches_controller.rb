# frozen_string_literal: true

module Authenticated::Borrower::Api
  class LoanRequestMatchesController < Authenticated::BorrowerController
    def index
      loan_request = current_user.loan_requests.find(params[:loan_request_id])
      loan_request_matches = loan_request.loan_request_matches.includes(lending_parameter: { user: [:profile] })

      render json: Borrower::LoanRequestMatchSerializer.new(loan_request_matches).serialized_json, status: :ok
    end

    def show; end

    def update
      loan_request = current_user.loan_requests.find(params[:loan_request_id])
      loan_request_match = loan_request.loan_request_matches.find(params[:id])

      if (params[:interest])
        loan_request_match.mark_interested
      else
        loan_request_match.mark_not_interested
      end

      render json: Borrower::LoanRequestMatchSerializer.new(loan_request_match.reload).serialized_json, status: :ok
    end
  end
end 
