class AddFdicCertToOrganizations < ActiveRecord::Migration[6.1]
  def change
    add_column :organizations, :fdic_cert, :string, index: true, unique: true
  end
end
