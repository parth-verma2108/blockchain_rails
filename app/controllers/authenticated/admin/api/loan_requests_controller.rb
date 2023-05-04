# frozen_string_literal: true

module Authenticated::Admin::Api
  class LoanRequestsController < Authenticated::AdminController
    def index
      loan_requests = LoanRequest.all.includes(user: [:profile]).order(created_at: :desc).kept
      render json: Admin::LoanRequestSerializer.new(loan_requests).serialized_json, status: :ok
    end

    def create
      @loan_request = LoanRequest.new_from_params(create_params)
      @loan_request.search = Search.new_from_params(create_params.merge(
        name: "Request of $#{(@loan_request.loan_amount_cents / 100.0).to_s.reverse.gsub(/(\d{3})(?=\d)/, '\\1,').reverse} for #{@loan_request.property_type || "Unspecified Property"}",
      ))
      if @loan_request.save
        @loan_request.submit if params[:submit]
        add_loan_request_organizations if create_params[:selected_lenders]
        @loan_request.generate_matches

        InternalMailer.notify_tony_of_quote_request.deliver_now
        render json: { redirect: loan_request_show_path(@loan_request) }, status: :created
      else
        render json: @loan_request.errors.full_messages.join(', '), status: :unprocessable_entity
      end
    rescue StandardError => error
      # TODO: Bugsnag
    end

    def update
      loan_request = LoanRequest.all.kept.find(params[:id])
      updated_loan_request = loan_request.merge_attributes_from_params(create_params)

      if updated_loan_request.save
        add_loan_request_organizations(updated_loan_request)
        render json: { redirect: loan_request_show_path(updated_loan_request) }
      else
        render json: updated_loan_request.errors.full_messages.join(', '), status: :unprocessable_entity
      end
    end

    def show
    end

    private

    def add_loan_request_organizations(loan_request = @loan_request)
      loan_request.reload.add_loan_request_organizations(create_params[:selected_lenders])
    end

    def create_params
      @permitted ||= params.require(
        :loan_request
      ).permit(
        :loanAmountRequested,
        :locationCity,
        :locationPostalCode,
        :borrowerName,
        :borrowerMobileNumber,
        :borrowerEmail,
        :borrowerCity,
        :unitQuantity,
        :netRentableSquareFeet,
        :physicalOccupancy,
        :yearBuilt,
        :tenantConcentration,
        :starRating,
        :propertyComments,
        :transactionType,
        :purchasePrice,
        :purchaseClosingDate,
        :refinancePropertyValue,
        :refinanceOutstandingLoanBalance,
        :numberKeyPrincipals,
        :sponsorCombinedLiquidity,
        :sponsorCombinedNetWorth,
        :sponsorCombinedYearsExperience,
        :sponsorCreditIssuesDisclosed,
        :sponsorComments,
        :transactionSummary,
        selectedLenders: [],
        borrowerState: ['value'],
        locationState: ['value'],
        propertyType: ['value'],
        purchaseUnderContract: ['value'],
        typeOfFinancing: ['value'],
      )

      @create_params ||= formatted_params(@permitted.to_h.deep_transform_keys(&:underscore))
    end

    def formatted_params(transformed_params)
      formatted_params = {}
      transformed_params.map do |key, value|
        if value.kind_of?(Array) && key != "selected_lenders"
          formatted_params[key.to_sym] = value.map(&:values).flatten
        else
          formatted_params[key.to_sym] = value
        end
      end

      formatted_params[:user_id] = current_user&.id
      formatted_params[:property_type_financed] = formatted_params[:property_type]&.[]("value")
      formatted_params[:loan_amount_requested_cents] = (formatted_params[:loan_amount_requested] || 0) * 100
      formatted_params[:loan_amount_cents] = (formatted_params.delete(:loan_amount_requested) || 0) * 100

      formatted_params
    end
  end
end 
