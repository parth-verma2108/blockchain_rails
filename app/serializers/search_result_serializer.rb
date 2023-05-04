# frozen_string_literal: true

class SearchResultSerializer < BaseSerializer
  cache_options store: Rails.cache, namespace: 'jsonapi-serializer', expires_in: 1.hour

  set_type :organization
  has_many :organization_branches, record_type: :organization_branch, serializer: OrganizationBranchSerializer
  attributes :name, :website
end
