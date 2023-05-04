# frozen_string_literal: true

module Authenticated::Admin::Api
  class SetupController < Authenticated::AdminController
    def create_lender
      new_user = User.create(
        email: create_user_params[:newEmail],
        password: create_user_params[:newPassword].present? ? 
          create_user_params[:newPassword] :
          SecureRandom.hex
      )

      @new_user = new_user

      lending_parameter = new_user.lending_parameter
      profile = new_user.profile

      transaction_complete = false

      ActiveRecord::Base.transaction do
        profile = new_user.create_profile unless new_user.profile
        lending_parameter = new_user.create_lending_parameter unless new_user.lending_parameter

        new_user.profile.update!(profile_params)
        new_user.lending_parameter.update!(lending_parameter_params)
        
        existing_lending_parameter_states = lending_parameter.lending_parameter_states.pluck(:state_id)

        states = State.where(name: lending_parameter_states_params)

        states.each do |state|
          next if existing_lending_parameter_states.include?(state.id)

          LendingParameterState.create!(
            lending_parameter_id: lending_parameter.id,
            state_id: state.id
          )
        end

        transaction_complete = true
      end

      if transaction_complete
        render json: { redirect: "/" }, status: :created
      else
        error_messages = [lending_parameter, profile].each do |entity|
          entity&.errors&.full_messages&.join(', ')
        end.compact

        render json: error_messages, status: :unprocessable_entity
      end
    end

    private
    def create_user_params
      @permitted_create_user_params ||= params.permit(
        :newEmail,
        :newPassword
      )
    end

    def lending_parameter_params
      @permitted_lending_parameter_params ||= params.permit(
        :minimumLoanAmount,
        :maximumLoanAmount,
        :elevatorPitch,
        :comments,
        directLenderMortgageBroker: ['value'],
        typeOfInstitution: ['value'],
        recourse: ['value'],
        propertyTypesFinanced: ['value'],
        typeOfFinancing: ['value']
      )

      @lending_parameter_params ||= formatted_params(@permitted_lending_parameter_params.to_h.deep_transform_keys(&:underscore))
    end

    def profile_params
      @permitted_profile_params ||= params.permit(
        :firstName,
        :lastName,
        :officePhone,
        :personalPhone,
        :companyName,
        :title,
        profileState: ['value']
      )

      @profile_params ||= formatted_params(@permitted_profile_params.to_h.deep_transform_keys(&:underscore))
    end

    def lending_parameter_states_params
      @lending_parameter_states_params ||= params.permit(
        lendingStates: ['value']
      ).to_h["lendingStates"].map { |object| object["value"] }
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

      formatted_params[:user_id] = @new_user&.id
      formatted_params[:minimum_loan_amount_cents] = (formatted_params.delete(:minimum_loan_amount) || 0) * 100 if formatted_params[:minimum_loan_amount]
      formatted_params[:maximum_loan_amount_cents] = (formatted_params.delete(:maximum_loan_amount) || 0) * 100 if formatted_params[:maximum_loan_amount]
      formatted_params[:state_id] = State.find_by_name(formatted_params.delete(:profile_state)&.[]("value"))&.id if formatted_params[:profile_state]
      formatted_params[:cellular_phone] = formatted_params.delete(:personal_phone) if formatted_params[:personal_phone] if formatted_params[:personal_phone]
      formatted_params[:direct_lender_mortgage_broker] = [formatted_params.delete(:direct_lender_mortgage_broker)&.[]("value")] if formatted_params[:direct_lender_mortgage_broker]
      formatted_params
    end
  end
end 
