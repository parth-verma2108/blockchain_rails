# frozen_string_literal: true

module Authenticated::Borrower::Api
  class SearchesController < Authenticated::BorrowerController
    def create
      search = Search.new_from_params(create_params)
      if search.save
        # if search.property_type_financed.include?("Multifamily") && search.loan_amount_requested_cents >= (1_200_000 * 100)
          # TODO: Deliver later
          InternalMailer.notify_tony_of_search(search.id).deliver_later
        # end
        render json: { redirect: lenders_search_show_path(search) }, status: :created
      else
        render json: search.errors.full_messages.join(', '), status: :unprocessable_entity
      end
    end

    def index
      searches = current_user.searches.order(updated_at: :desc)
      render json: Borrower::SearchSerializer.new(searches).serialized_json, status: :ok
    end

    def show
      search = current_user.searches.find(params[:id])
      render json: Borrower::SearchSerializer.new(search).serialized_json, status: :ok
    end

    def update
      search = current_user.searches.find(params[:id])
      updated_search = search.merge_attributes_from_params(params)

      if updated_search.merge_attributes_from_params(create_params).save
        render json: { redirect: lenders_search_show_path(search) }
      else
        render json: search.errors.full_messages.join(', '), status: :unprocessable_entity
      end
    end

    def results
      search = current_user.searches.find(params[:search_id])
      search_results = search.results
      render json: SearchResultSerializer.new(search_results, include: [:organization_branches]).serialized_json, status: :created
    end

    def destroy
      search = current_user.searches.find(params[:id])

      search.discard
      head :ok
    end

    private

    def create_params
      @permitted ||= params.require(
        :search
      ).permit(
        :name,
        :loanAmountRequested,
        :locationCity,
        :locationPostalCode,
        propertyTypeFinanced: ['value'],
        locationState: ['value'],
        locationCounty: ['value'],
        locationRange: ['value'],
        typeOfInstitution: ['value'],
        directLenderMortgageBroker: ['value'],
        retailWholesale: ['value'],
        typeOfFinancing: ['value'],
        recourse: ['value'],
        foreignNationalsConsidered: ['value']
      )

      @create_params ||= formatted_params(@permitted.to_h.deep_transform_keys(&:underscore))
    end

    def formatted_params(transformed_params)
      formatted_params = {}
      transformed_params.map do |key, value|
        if value.kind_of?(Array)
          formatted_params[key.to_sym] = value.map(&:values).flatten
        else
          formatted_params[key.to_sym] = value
        end
      end

      formatted_params[:user_id] = current_user&.id
      formatted_params[:loan_amount_requested_cents] = (formatted_params.delete(:loan_amount_requested) || 0) * 100

      formatted_params
    end
  end
end 
