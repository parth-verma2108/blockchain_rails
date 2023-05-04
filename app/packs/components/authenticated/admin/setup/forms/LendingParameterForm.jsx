import React from "react";
import { useDispatch } from "react-redux";

import { Formik, Form } from "formik";
import snakeCase from "lodash/snakeCase";
import forEach from "lodash/forEach";

import withGlobalProviders from "../../../../general/withGlobalProvider";

import Select from "../../../../forms/SelectField";
import InputField from "../../../../forms/InputField";
import { createHandleSubmit } from "../../../../../utility/helpers";

import {
  initialValues as baseValues,
  updateValidationSchema,
  newValidationSchema,
  propertyTypeOptions,
  stateOptions,
  typeOfInstitutionOptions,
  directLenderMortgageBrokerOptions,
  typeOfFinancingOptions,
  recourseOptions,
} from "./helpers";

import { createLender } from "../../../../../actions/admin/userActions";
import toast from "react-hot-toast";
import { updateLendingParameter } from "../../../../../actions/admin/lendingParamaterActions";

function LendingParameterForm({ providedValues }) {
  const dispatch = useDispatch();
  const onSubmit = createHandleSubmit({
    handleSubmit: (values) => {
      if (providedValues) {

        const formData = {}

        forEach(
          Object.keys(values),
          (valueKey) => formData[snakeCase(valueKey)] = values[valueKey]
        )
  
        return dispatch(updateLendingParameter(providedValues.id, formData));
      } else {
        return dispatch(createLender({ ...values }));
      }
    },
    handleSuccess: (redirect) => {
      if (redirect) {
        toast.success("Created User")
        window.location.assign(redirect);
      } else {
        toast.success("Updated")
      }
    },
    handleErrors: (res) => {
      toast.error(res.response.data.join(", "))
    },
  });

  const initialValues = providedValues || baseValues;

  let validationSchema = providedValues ? updateValidationSchema : newValidationSchema;

  return (
    <div
      as="div"
      key={"lender-search-parameters"}
      aria-labelledby="lender-search-parameters"
      className="bg-white shadow-lg sm:rounded-lg"
    >
      <Formik {...{ initialValues, validationSchema, onSubmit }}>
        <Form autoComplete="off">
          <input className="hidden" autoComplete="off" />
          <dd className="">
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6 grid grid-cols-1 gap-y-4 gap-x-8 lg:grid-cols-4 sm:grid-cols-2">
              {!providedValues && <>
                <div className="sm:col-span-full border-b my-2 text-lg leading-5 font-medium text-gray-900">
                  Authentication Details
                </div>
                <div className="sm:col-span-2">
                  <InputField
                    name="newEmail"
                    type="email"
                    label="Email Address"
                    color="congress-blue"
                    autoComplete="new-email"
                    required={true}
                  />
                </div>
                <div className="sm:col-span-2">
                  <InputField
                    name="newPassword"
                    type="password"
                    label="Password"
                    color="congress-blue"
                    autoComplete="new-password"
                  />
                </div>
                <div className="sm:col-span-full border-b my-2 text-lg leading-5 font-medium text-gray-900">
                  Profile
                </div>
                <div className="sm:col-span-2">
                  <InputField
                    name="firstName"
                    type="text"
                    label="First Name"
                    color="congress-blue"
                    required={true}
                  />
                </div>
                <div className="sm:col-span-2">
                  <InputField
                    name="lastName"
                    type="text"
                    label="Last Name"
                    color="congress-blue"
                    required={true}
                  />
                </div>
                <div className="sm:col-span-2">
                  <InputField
                    name="officePhone"
                    type="text"
                    label="Office Phone"
                    color="congress-blue"
                  />
                </div>
                <div className="sm:col-span-2">
                  <InputField
                    name="personalPhone"
                    type="text"
                    label="Mobile Phone"
                    color="congress-blue"
                  />
                </div>
                <div className="sm:col-span-2">
                  <InputField
                    name="companyName"
                    type="text"
                    label="Company Name"
                    color="congress-blue"
                    required={true}
                  />
                </div>
                <div className="sm:col-span-2">
                  <InputField
                    name="title"
                    type="text"
                    label="Job Title"
                    color="congress-blue"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Select
                    name="profileState"
                    options={stateOptions}
                    label={"State In Which You Are Based"}
                    isClearable={true}
                    required={true}
                  />
                </div>
              </>}
              <div className="sm:col-span-full border-b my-2 text-lg leading-5 font-medium text-gray-900">
                Lending Parameters
              </div>
              <div className="sm:col-span-2">
                <Select
                  name="typeOfInstitution"
                  options={typeOfInstitutionOptions}
                  isMulti={true}
                  label={"Type of Institution"}
                  required={true}
                />
              </div>
              <div className="sm:col-span-2">
                <Select
                  name="directLenderMortgageBroker"
                  options={directLenderMortgageBrokerOptions}
                  label={"Direct Lender / Mortgage Broker"}
                  isClearable={true}
                  required={true}
                />
              </div>
              <div className="sm:col-span-2">
                <InputField
                  money={true}
                  name="minimumLoanAmount"
                  color="congress-blue"
                  type="number"
                  label={"Minimum Loan Amount"}
                  step="1000"
                  required={true}
                />
              </div>
              <div className="sm:col-span-2">
                <InputField
                  money={true}
                  name="maximumLoanAmount"
                  color="congress-blue"
                  type="number"
                  label={"Maximum Loan Amount"}
                  step="1000"
                  required={true}
                />
              </div>
              <div className="sm:col-span-2">
                <Select
                  name="recourse"
                  options={recourseOptions}
                  label={"Recourse"}
                  isMulti={true}
                  required={true}
                />
              </div>
              <div className="sm:col-span-2">
                <Select
                  name="lendingStates"
                  options={stateOptions}
                  label={"States In Which You Operate"}
                  isClearable={true}
                  required={true}
                  isMulti={true}
                  selectAll={true}
                />
              </div>
              <div className="sm:col-span-2">
                <Select
                  name="propertyTypesFinanced"
                  options={propertyTypeOptions}
                  isMulti={true}
                  label={"Property Type Financed"}
                  required={true}
                />
              </div>
              <div className="sm:col-span-2">
                <Select
                  name="typeOfFinancing"
                  options={typeOfFinancingOptions}
                  label={"Type of Financing Provided"}
                  isMulti={true}
                  required={true}
                />
              </div>
              <div className="sm:col-span-full">
                <InputField
                  name="elevatorPitch"
                  type="textarea"
                  label="Elevator Pitch"
                  color="congress-blue"
                />
              </div>
              <div className="sm:col-span-full">
                <InputField
                  name="comments"
                  type="textarea"
                  label="Comments"
                  color="congress-blue"
                />
              </div>
            </div>
          </dd>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-md">
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-congress-blue-600 text-base font-medium text-white hover:bg-congress-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-congress-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {providedValues ? "Update Lending Parameters" : "Create Lender"}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default withGlobalProviders(LendingParameterForm);
