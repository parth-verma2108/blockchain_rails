# frozen_string_literal: true

module Authenticated::Borrower::Api
  class UserSavedOrganizationsController < Authenticated::BorrowerController
    def index
      if params[:load_organizations]
        user_saved_organizations = current_user.saved_organizations.includes(organization_branches: [:postal_code, :state, :county])

        render json: SearchResultSerializer.new(user_saved_organizations, include: [:organization_branches]).serialized_json, status: :created
      else
        user_saved_organizations = current_user.user_saved_organizations.map(&:organization_id)

        render json: user_saved_organizations, status: :ok
      end
    end

    def create
      user_saved_organizations = []

      params[:organization_ids].each do |organization_id|
        user_saved_organizations << UserSavedOrganization.new(
          user_id: current_user.id,
          search_id: params[:search_id],
          organization_id: organization_id
        )
      end

      user_saved_organizations.map(&:save!)

      raise unless user_saved_organizations.all?

      if params[:redirect]
        render json: { redirect: loans_new_path(selectedLenders: params[:organization_ids]) }, status: :created
      else
        head :created
      end
    rescue StandardError => error
      # TODO: Bugsnag
      error_messages = user_saved_organizations.each do |user_saved_organization|
        user_saved_organization&.errors&.full_messages&.join(', ')
      end.compact

      render json: error_messages, status: :unprocessable_entity
    end

    def destroy
      user_saved_organization = current_user.user_saved_organizations.find_by_organization_id(params[:id])

      user_saved_organization.discard
      head :ok
    end

    private

    def create_params
      params.permit(:search_id, organization_ids: [])
    end
  end
end 
