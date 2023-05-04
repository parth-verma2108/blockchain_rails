# frozen_string_literal: true

module Authenticated::Lender
  class SetupController < Authenticated::LenderController
    def index; end
    
    def edit
      lending_parameter = current_user.lending_parameter

      raise unless lending_parameter

      @serialized_lending_parameter = LendingParameterSerializer.new(lending_parameter)
    end
  end
end
