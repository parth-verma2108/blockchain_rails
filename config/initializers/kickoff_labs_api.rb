require 'httparty'
require 'crack'

class KickoffLabsAPI 
  include HTTParty
  base_uri 'https://api.kickofflabs.com'

  def self.subscribe(page_id, args={})
    args[:api_key] = ENV['KICKOFFLABS_API_KEY'] if ENV['KICKOFFLABS_API_KEY']
    response = post("/v1/#{page_id}/subscribe", :body => args)
    if response.code == 200
      Crack::JSON.parse(response.body)
    else
      "Failed with status #{response.code} and body #{response.body}"
    end
  end

  def self.info(page_id, args={})
    args[:api_key] = ENV['KICKOFFLABS_API_KEY'] if ENV['KICKOFFLABS_API_KEY']
    response = get("/v1/#{page_id}/info", :query => args)
    if response.code == 200
      Crack::JSON.parse(response.body)
    else
      "Failed with status #{response.code} and body #{response.body}"
    end
  end
end
