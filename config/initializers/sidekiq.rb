# frozen_string_literal: true

require 'active_support/security_utils'
require 'sidekiq'
require 'sidekiq/web'

Sidekiq::Web.use(Rack::Auth::Basic) do |user, password|
  ActiveSupport::SecurityUtils.secure_compare(user, ENV["SIDEKIQ_ADMIN_USER"] || 'admin') &
    ActiveSupport::SecurityUtils.secure_compare(password, ENV["SIDEKIQ_ADMIN_PASSWORD"] || 'test')
end

Sidekiq.configure_server do |config|
  config.redis = { url: ENV.fetch("REDIS_SIDEKIQ_URL") { "redis://localhost:6379/1" }, ssl_params: { verify_mode: OpenSSL::SSL::VERIFY_NONE } }

  database_url = ENV['DATABASE_URL']

  if database_url
    database_url = database_url.split(":")
    database_url[0] = "postgis"
    database_url = database_url.join(":")

    ActiveRecord::Base.establish_connection("#{database_url}?pool=25")
    # Note that as of Rails 4.1 the `establish_connection` method requires
    # the database_url be passed in as an argument. Like this:
    # ActiveRecord::Base.establish_connection(ENV['DATABASE_URL'])
  end
end

Sidekiq.configure_client do |config|
  config.redis = {url: ENV['REDIS_SIDEKIQ_URL'], size: 1, ssl_params: { verify_mode: OpenSSL::SSL::VERIFY_NONE }}
end
