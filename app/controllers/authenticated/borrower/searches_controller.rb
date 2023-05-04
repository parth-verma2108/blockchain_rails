# frozen_string_literal: true

module Authenticated::Borrower
  class SearchesController < Authenticated::BorrowerController
    def index
    end

    def new
    end

    def show
      @search = current_user.searches.find(params[:id])
    end

    def edit
      @search = current_user.searches.find(params[:id])
    end
  end
end
