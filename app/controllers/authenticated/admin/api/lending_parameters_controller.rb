# frozen_string_literal: true

module Authenticated::Admin::Api
  class LendingParametersController < Authenticated::AdminController
    def index
      lending_parameters = LendingParameters.all.includes(user: [:profile])
      render json: LendingParameterSerializer.new(lending_parameter).serialized_json
    end

    def show
      lending_parameter = LendingParameter.includes(:states, user: [:profile]).find(params[:id])
      render json: LendingParameterSerializer.new(lending_parameter).serialized_json
    end

    def update
      lending_parameter = LendingParameter.find(params[:id])
      lending_parameter.update!(update_params)

      head :ok
    end

    private

    def update_params
      lending_parameter_params = params.require(:lending_parameter).permit(
        :minimum_loan_amount,
        :maximum_loan_amount,
        :elevator_pitch,
        :comments,
        direct_lender_mortgage_broker: [:value],
        type_of_institution: [:value],
        recourse: [:value],
        property_types_financed: [:value],
        type_of_financing: [:value]
      )

      formatted_params(lending_parameter_params.to_h)
    end

    def formatted_params(transformed_params)
      formatted_param_object = {}
      transformed_params.map do |key, value|
        if value.kind_of?(Array)
          formatted_param_object[key.to_sym] = value.map(&:values).flatten
        else
          formatted_param_object[key.to_sym] = value
        end
      end

      formatted_param_object[:minimum_loan_amount_cents] = (formatted_param_object.delete(:minimum_loan_amount) || 0) * 100 if formatted_param_object[:minimum_loan_amount]
      formatted_param_object[:maximum_loan_amount_cents] = (formatted_param_object.delete(:maximum_loan_amount) || 0) * 100 if formatted_param_object[:maximum_loan_amount]
      formatted_param_object[:direct_lender_mortgage_broker] = [formatted_param_object.delete(:direct_lender_mortgage_broker)&.[]("value")] if formatted_param_object[:direct_lender_mortgage_broker]
      formatted_param_object
    end
  end
end 
