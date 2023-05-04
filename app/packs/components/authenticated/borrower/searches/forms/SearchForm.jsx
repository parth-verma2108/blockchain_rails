import React from "react";
import { useDispatch } from "react-redux";

import { Formik, Form } from "formik";

import withGlobalProviders from "../../../../general/withGlobalProvider";

import Select from "../../../../forms/SelectField";
import InputField from "../../../../forms/InputField";
import { createHandleSubmit } from "../../../../../utility/helpers";
import { createSearch, updateSearch } from "../../../../../actions/searchActions";

import {
  initialValues as baseValues,
  validationSchema,
  propertyTypeOptions,
  stateOptions,
  counties,
  locationRangeOptions,
  typeOfInstitutionOptions,
  directLenderMortgageBrokerOptions,
  retailWholesaleOptions,
  typeOfFinancingOptions,
  recourseOptions,
  foreignNationalsConsideredOptions,
} from "./helpers";

function SearchForm({ providedValues }) {
  const dispatch = useDispatch();
  const onSubmit = createHandleSubmit({
    handleSubmit: (values) => {
      if (providedValues) {
        return dispatch(updateSearch(providedValues.id, { ...values }))
      } else {
        return dispatch(createSearch({ ...values }));
      }
    },
    handleSuccess: (redirect) => {
      if (redirect) {
        window.location.assign(redirect)
      }
    },
    handleErrors: () => { },
  });

  const initialValues = providedValues || baseValues;

  return (
    <div
      as="div"
      key={"lender-search-parameters"}
      aria-labelledby="lender-search-parameters"
      className="bg-white shadow-lg sm:rounded-lg"
    >
      <Formik {...{ initialValues, validationSchema, onSubmit }}>
        {({ values, setFieldValue, touched, errors, submitForm }) => {
          return (
            <Form>
              <dd className="">
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6 grid grid-cols-1 gap-y-4 gap-x-8 lg:grid-cols-4 sm:grid-cols-2">
                  <div className="sm:col-span-full border-b my-2 text-lg leading-5 font-medium text-gray-900">
                    Search Details
                  </div>
                  <div className="sm:col-span-full">
                    <InputField
                      name="name"
                      type="text"
                      label="Search Name"
                      color="congress-blue"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <InputField
                      money={true}
                      name="loanAmountRequested"
                      color="congress-blue"
                      type="number"
                      label={"Loan Amount Requested"}
                      step="1000"
                      required={true}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Select
                      name="propertyTypeFinanced"
                      options={propertyTypeOptions}
                      isMulti={true}
                      label={"Property Type Financed"}
                      required={true}
                    />
                  </div>
                  <div className="sm:col-span-full border-b my-2 text-lg leading-5 font-medium text-gray-900">
                    Search By Location
                  </div>
                  <div className="sm:col-span-2">
                    <InputField
                      name="locationCity"
                      type="text"
                      label="City"
                      color="congress-blue"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Select
                      name="locationState"
                      options={stateOptions}
                      label={"State"}
                      isClearable={true}
                      required={true}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <InputField
                      name="locationPostalCode"
                      type="text"
                      label="Postal Code"
                      color="congress-blue"
                      required={true}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Select
                      name="locationCounty"
                      label={"County"}
                      requires={"locationState"}
                      requiresOptions={counties}
                      isClearable={true}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Select
                      name="locationRange"
                      isClearable={true}
                      options={locationRangeOptions}
                      label={"Range / Distance"}
                      requires={"locationPostalCode"}
                      required={true}
                    />
                  </div>
                  {/* <div className="sm:col-span-full border-b my-2 text-lg leading-5 font-medium text-gray-900">
                    Advanced Loan Details
                  </div>
                  <div className="sm:col-span-2">
                    <Select
                      name="typeOfInstitution"
                      options={typeOfInstitutionOptions}
                      isMulti={true}
                      label={"Type of Institution"}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Select
                      name="directLenderMortgageBroker"
                      options={directLenderMortgageBrokerOptions}
                      label={"Direct Lender / Mortgage Broker"}
                      isClearable={true}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Select
                      name="retailWholesale"
                      options={retailWholesaleOptions}
                      label={"Retail / Wholesale"}
                      isClearable={true}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Select
                      name="typeOfFinancing"
                      options={typeOfFinancingOptions}
                      label={"Type of Financing Provided"}
                      isMulti={true}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Select
                      name="recourse"
                      options={recourseOptions}
                      label={"Recourse"}
                      isMulti={true}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Select
                      name="foreignNationalsConsidered"
                      options={foreignNationalsConsideredOptions}
                      label={"Foreign Nationals Considered"}
                      isClearable={true}
                    />
                  </div> */}
                  {/* <div className="sm:col-span-full border-b my-2 text-lg leading-5 font-medium text-gray-900">
                Advanced Location Details
              </div>
              <div className="sm:col-span-full">
                <Select
                  name="statesCovered"
                  options={stateOptions}
                  label={"States Covered"}
                  isMulti={true}
                />
              </div>
              <div className="sm:col-span-full">
                <Select
                  name="countiesCovered"
                  options={[]}
                  label={"Counties Covered"}
                  isMulti={true}
                />
              </div>
              <div className="sm:col-span-full">
                <Select
                  name="msasCovered"
                  options={[]}
                  label={"MSAs Covered"}
                  isMulti={true}
                />
              </div> */}
                </div>
              </dd>
              <div className="block bg-gray-50 text-sm font-medium text-gray-500 text-center px-4 py-4 hover:text-gray-700 sm:rounded-b-lg">
                <button
                  type="submit"
                  className="inline-flex items-center w-1/2 justify-center mr-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-congress-blue-600 hover:bg-congress-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-congress-blue-500"
                >
                  {providedValues ? "Update Search" : "Create Search"}
                </button>
              </div>
            </Form>)
        }}
      </Formik>
    </div>
  );
}

export default withGlobalProviders(SearchForm);
