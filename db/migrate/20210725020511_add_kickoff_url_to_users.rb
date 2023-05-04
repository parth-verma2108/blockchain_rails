class AddKickoffUrlToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :kickoff_url, :string
  end
end
