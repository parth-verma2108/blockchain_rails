# frozen_string_literal: true

module Authenticated
  class BaseController < ApplicationController
    before_action :authenticate_user!
  end
end
