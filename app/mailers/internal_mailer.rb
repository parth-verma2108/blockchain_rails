# frozen_string_literal: true

class InternalMailer < ApplicationMailer
  default from: 'no_reply@lenderprism.com'

  def notify_tony_of_search(search_id)
    @search = Search.find search_id

    mail to: "tony@lenderprism.com",
      subject: "New search of interest on LenderPrism"
  end

  def notify_tony_of_quote_request
    mail to: "tony@lenderprism.com",
      subject: "New quote request on LenderPrism"
  end
end
