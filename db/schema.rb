# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_09_08_221451) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_stat_statements"
  enable_extension "pgcrypto"
  enable_extension "plpgsql"
  enable_extension "postgis"

  create_table "comments", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "subject_type"
    t.uuid "subject_id"
    t.uuid "user_id"
    t.text "body"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.text "subject"
    t.index ["subject_type", "subject_id"], name: "index_comments_on_subject"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "counties", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.uuid "state_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["state_id"], name: "index_counties_on_state_id"
  end

  create_table "forums", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.text "title"
  end

  create_table "lending_parameter_states", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "state_id"
    t.uuid "lending_parameter_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["lending_parameter_id"], name: "index_lending_parameter_states_on_lending_parameter_id"
    t.index ["state_id"], name: "index_lending_parameter_states_on_state_id"
  end

  create_table "lending_parameters", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.text "property_types_financed", array: true
    t.bigint "minimum_loan_amount_cents"
    t.bigint "maximum_loan_amount_cents"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.text "type_of_institution", default: [], array: true
    t.text "recourse", default: [], array: true
    t.text "type_of_financing", default: [], array: true
    t.text "elevator_pitch"
    t.text "comments"
    t.uuid "user_id", null: false
    t.text "direct_lender_mortgage_broker", default: [], array: true
    t.text "retail_wholesale", default: [], array: true
    t.index ["maximum_loan_amount_cents"], name: "index_lending_parameters_on_maximum_loan_amount_cents"
    t.index ["minimum_loan_amount_cents"], name: "index_lending_parameters_on_minimum_loan_amount_cents"
    t.index ["property_types_financed"], name: "index_lending_parameters_on_property_types_financed", using: :gin
    t.index ["user_id"], name: "index_lending_parameters_on_user_id"
  end

  create_table "likes", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "subject_type"
    t.uuid "subject_id"
    t.uuid "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["subject_type", "subject_id"], name: "index_likes_on_subject"
    t.index ["user_id"], name: "index_likes_on_user_id"
  end

  create_table "loan_request_matches", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "loan_request_id"
    t.uuid "user_id"
    t.uuid "organization_id"
    t.uuid "lending_parameter_id"
    t.datetime "published_at"
    t.datetime "interested_at"
    t.datetime "not_interested_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["lending_parameter_id"], name: "index_loan_request_matches_on_lending_parameter_id"
    t.index ["loan_request_id"], name: "index_loan_request_matches_on_loan_request_id"
    t.index ["organization_id"], name: "index_loan_request_matches_on_organization_id"
    t.index ["user_id"], name: "index_loan_request_matches_on_user_id"
  end

  create_table "loan_request_organizations", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "loan_request_id"
    t.uuid "organization_id"
    t.datetime "discarded_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.datetime "submitted_at"
    t.index ["discarded_at"], name: "index_loan_request_organizations_on_discarded_at"
    t.index ["loan_request_id"], name: "index_loan_request_organizations_on_loan_request_id"
    t.index ["organization_id"], name: "index_loan_request_organizations_on_organization_id"
  end

  create_table "loan_request_quotes", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "loan_request_id"
    t.uuid "user_id"
    t.uuid "organization_id"
    t.string "loan_amount"
    t.string "interest_rate"
    t.string "fixed_or_floating"
    t.string "term"
    t.string "amortization"
    t.string "interest_only_period"
    t.string "prepayment_penalty"
    t.string "origination_fee"
    t.string "recourse"
    t.datetime "published_at"
    t.datetime "interested_at"
    t.datetime "not_interested_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["loan_request_id"], name: "index_loan_request_quotes_on_loan_request_id"
    t.index ["organization_id"], name: "index_loan_request_quotes_on_organization_id"
    t.index ["user_id"], name: "index_loan_request_quotes_on_user_id"
  end

  create_table "loan_requests", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id"
    t.uuid "search_id"
    t.bigint "loan_amount_cents"
    t.text "property_type"
    t.datetime "discarded_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "location_city"
    t.string "borrower_name"
    t.string "borrower_mobile_number"
    t.string "borrower_city"
    t.uuid "borrower_state_id"
    t.string "borrower_email"
    t.text "type_of_financing", default: [], array: true
    t.bigint "unit_quantity"
    t.bigint "net_rentable_square_feet"
    t.float "physical_occupancy"
    t.bigint "year_built"
    t.text "tenant_concentration"
    t.string "star_rating"
    t.text "property_comments"
    t.string "transaction_type"
    t.bigint "purchase_price"
    t.boolean "purchase_under_contract"
    t.datetime "purchase_closing_date"
    t.bigint "refinance_property_value"
    t.bigint "refinance_outstanding_loan_balance"
    t.bigint "number_key_principals"
    t.bigint "sponsor_combined_liquidity"
    t.bigint "sponsor_combined_net_worth"
    t.bigint "sponsor_combined_years_experience"
    t.string "sponsor_credit_issues_disclosed"
    t.text "sponsor_comments"
    t.text "transaction_summary"
    t.datetime "submitted_at"
    t.uuid "location_state_id"
    t.uuid "location_postal_code_id"
    t.index ["borrower_state_id"], name: "index_loan_requests_on_borrower_state_id"
    t.index ["discarded_at"], name: "index_loan_requests_on_discarded_at"
    t.index ["loan_amount_cents"], name: "index_loan_requests_on_loan_amount_cents"
    t.index ["location_postal_code_id"], name: "index_loan_requests_on_location_postal_code_id"
    t.index ["location_state_id"], name: "index_loan_requests_on_location_state_id"
    t.index ["search_id"], name: "index_loan_requests_on_search_id"
    t.index ["user_id"], name: "index_loan_requests_on_user_id"
  end

  create_table "organization_branches", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.string "street"
    t.string "city"
    t.uuid "postal_code_id", null: false
    t.uuid "state_id", null: false
    t.uuid "county_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.uuid "organization_id", null: false
    t.geography "coordinates", limit: {:srid=>4326, :type=>"st_point", :geographic=>true}
    t.float "longitude"
    t.float "latitude"
    t.string "phone_number"
    t.index ["coordinates"], name: "index_organization_branches_on_coordinates", using: :gist
    t.index ["county_id"], name: "index_organization_branches_on_county_id"
    t.index ["latitude", "longitude"], name: "index_organization_branches_on_latitude_and_longitude"
    t.index ["organization_id"], name: "index_organization_branches_on_organization_id"
    t.index ["postal_code_id"], name: "index_organization_branches_on_postal_code_id"
    t.index ["state_id"], name: "index_organization_branches_on_state_id"
  end

  create_table "organizations", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "organization_type"
    t.string "name"
    t.string "website"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "int_id"
    t.string "fdic_cert"
  end

  create_table "postal_codes", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "state_id"
    t.string "code", null: false
    t.geography "coordinates", limit: {:srid=>4326, :type=>"st_point", :geographic=>true}, null: false
    t.float "longitude", null: false
    t.float "latitude", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["coordinates"], name: "index_postal_codes_on_coordinates", using: :gist
    t.index ["latitude", "longitude"], name: "index_postal_codes_on_latitude_and_longitude"
    t.index ["state_id"], name: "index_postal_codes_on_state_id"
  end

  create_table "profiles", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id"
    t.string "first_name"
    t.string "last_name"
    t.uuid "state_id"
    t.string "office_phone"
    t.string "cellular_phone"
    t.string "company_name"
    t.string "title"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["state_id"], name: "index_profiles_on_state_id"
    t.index ["user_id"], name: "index_profiles_on_user_id"
  end

  create_table "regions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "searches", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id", null: false
    t.text "property_types_financed", array: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "name"
    t.bigint "loan_amount_requested_cents"
    t.string "location_city"
    t.uuid "location_postal_code_id"
    t.uuid "location_state_id"
    t.text "property_type_financed", default: [], array: true
    t.bigint "location_range"
    t.text "type_of_institution", default: [], array: true
    t.string "direct_lender_mortgage_broker"
    t.string "retail_wholesale"
    t.text "type_of_financing", default: [], array: true
    t.text "recourse", default: [], array: true
    t.boolean "foreign_nationals_considered"
    t.datetime "discarded_at"
    t.index ["discarded_at"], name: "index_searches_on_discarded_at"
    t.index ["location_postal_code_id"], name: "index_searches_on_location_postal_code_id"
    t.index ["location_state_id"], name: "index_searches_on_location_state_id"
    t.index ["user_id"], name: "index_searches_on_user_id"
  end

  create_table "states", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.string "abbreviation"
    t.uuid "region_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["region_id"], name: "index_states_on_region_id"
  end

  create_table "user_saved_organizations", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id"
    t.uuid "organization_id"
    t.uuid "search_id"
    t.datetime "discarded_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["discarded_at"], name: "index_user_saved_organizations_on_discarded_at"
    t.index ["organization_id", "search_id"], name: "index_user_saved_organizations_on_organization_id_and_search_id"
    t.index ["organization_id"], name: "index_user_saved_organizations_on_organization_id"
    t.index ["search_id", "organization_id"], name: "index_user_saved_organizations_on_search_id_and_organization_id"
    t.index ["search_id"], name: "index_user_saved_organizations_on_search_id"
    t.index ["user_id", "organization_id"], name: "index_user_saved_organizations_on_user_id_and_organization_id"
    t.index ["user_id", "search_id"], name: "index_user_saved_organizations_on_user_id_and_search_id"
    t.index ["user_id"], name: "index_user_saved_organizations_on_user_id"
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "user_type"
    t.string "kickoff_url"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "counties", "states"
  add_foreign_key "organization_branches", "counties"
  add_foreign_key "organization_branches", "organizations"
  add_foreign_key "organization_branches", "postal_codes"
  add_foreign_key "organization_branches", "states"
  add_foreign_key "searches", "users"
end
