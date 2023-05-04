# frozen_string_literal: true

module Authenticated::Borrower::Api
  class SetupController < Authenticated::BorrowerController
    def update
      profile = current_user.profile

      transaction_complete = false

      ActiveRecord::Base.transaction do
        profile = current_user.create_profile unless current_user.profile

        current_user.profile.update!(profile_params)
        transaction_complete = true
      end

      if transaction_complete
        render json: { redirect: "/" }, status: :ok
      else
        error_messages = profile&.errors&.full_messages&.join(', ')

        render json: error_messages, status: :unprocessable_entity
      end
    end

    private

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
      formatted_params[:state_id] = State.find_by_name(formatted_params.delete(:profile_state)&.[]("value"))&.id if formatted_params[:profile_state]
      formatted_params[:cellular_phone] = formatted_params.delete(:personal_phone) if formatted_params[:personal_phone] if formatted_params[:personal_phone]
      formatted_params
    end
  end
end 
