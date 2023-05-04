class AddPhoneNumbersToOrganizationBranches < ActiveRecord::Migration[6.1]
  def change
    add_column :organization_branches, :phone_number, :string
  end
end
