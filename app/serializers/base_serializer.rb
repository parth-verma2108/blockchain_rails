# frozen_string_literal: true

require 'oj'
require 'jsonapi/serializer'

class BaseSerializer
  include JSONAPI::Serializer

  set_key_transform :camel_lower

  class << self
    delegate :url_helpers, to: :'Rails.application.routes'
  end

  def to_json(*_args)
    Oj.dump(serializable_hash, mode: :compat, time_format: :ruby, use_to_json: true)
  end

  alias_method :serialized_json, :to_json
end
