# frozen_string_literal: true

module Authenticated::Borrower::Api
  class LoanRequestQuotesController < Authenticated::BorrowerController
    def index
      loan_request = current_user.loan_requests.find(params[:loan_request_id])
      loan_request_quotes = loan_request.loan_request_quotes

      render json: Borrower::LoanRequestQuoteSerializer.new(loan_request_quotes).serialized_json, status: :ok
    end

    def show; end

    def update
      loan_request = current_user.loan_requests.find(params[:loan_request_id])
      loan_request_quote = loan_request.loan_request_quotes.find(params[:id])

      if (params[:interest])
        loan_request_quote.mark_interested
      else
        loan_request_quote.mark_not_interested
      end

      render json: Borrower::LoanRequestQuoteSerializer.new(loan_request_quote.reload).serialized_json, status: :ok
    end
  end
end 
