# frozen_string_literal: true

module Authenticated::Admin
  class SetupController < Authenticated::AdminController
    def index
      lending_parameters = LendingParameter.all.includes(lending_parameter_states: [:state], user: [:profile]).where.not(profile: { id: nil }).order("profile.company_name")
      @serialized_lending_parameters = LendingParameterSerializer.new(lending_parameters)
    end

    def new; end

    def edit
      lending_parameter = LendingParameter.find(params[:lending_parameter_id])
      @serialized_lending_parameter = LendingParameterSerializer.new(lending_parameter)
    end
  end
end
