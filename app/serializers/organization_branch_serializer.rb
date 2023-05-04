# frozen_string_literal: true

# == Schema Information
#
# Table name: organization_branches
#
#  id              :uuid             not null, primary key
#  name            :string
#  street          :string
#  city            :string
#  postal_code_id  :uuid             not null
#  state_id        :uuid             not null
#  county_id       :uuid             not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  organization_id :uuid             not null
#  coordinates     :geography        point, 4326
#  longitude       :float
#  latitude        :float
#  phone_number    :string
#
class OrganizationBranchSerializer < BaseSerializer
  # cache_options store: Rails.cache, namespace: 'jsonapi-serializer', expires_in: 1.hour

  attributes :id, :name, :street, :city, :longitude, :latitude, :organization_id

  attribute :organization_name do |organization_branch|
    organization_branch.organization.name
  end

  attribute :postal_code do |organization_branch|
    organization_branch.postal_code.code
  end

  attribute :county do |organization_branch|
    organization_branch.county.name
  end

  attribute :state do |organization_branch|
    organization_branch.state.name
  end

  attribute :state_abbreviation do |organization_branch|
    organization_branch.state.abbreviation
  end
end
