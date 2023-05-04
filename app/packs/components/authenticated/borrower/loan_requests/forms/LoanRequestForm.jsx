import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Transition, RadioGroup } from "@headlessui/react";

import concat from "lodash/concat";
import without from "lodash/without";
import includes from "lodash/includes";
import cloneDeep from "lodash/cloneDeep";
import merge from "lodash/merge";

import { Formik, Form } from "formik";

import withGlobalProviders from "../../../../general/withGlobalProvider";

import Select from "../../../../forms/SelectField";
import InputField from "../../../../forms/InputField";
import { createHandleSubmit } from "../../../../../utility/helpers";

import {
  initialValues as baseValues,
  validationSchema,
  propertyTypeOptions,
  stateOptions,
  typeOfFinancingOptions,
  foreignNationalsConsideredOptions,
} from "./helpers";

import {
  fetchSavedOrganizations,
  fetchUserSavedOrganizations,
} from "../../../../../actions/userSavedOrganizationActions";

import { createLoanRequest, updateLoanRequest } from "../../../../../actions/loanRequestActions";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function LoanRequestForm({ providedValues }) {
  const dispatch = useDispatch();
  const { loaded, items } = useSelector(
    (state) => state.userSavedOrganizations
  );
  const organizations = useSelector((state) => state.organizations.items);

  useEffect(() => {
    dispatch(fetchUserSavedOrganizations());
    dispatch(fetchSavedOrganizations());
  }, [dispatch]);

  const onSubmit = createHandleSubmit({
    handleSubmit: (values, submit = true) => {
      if (providedValues) {
        return dispatch(updateLoanRequest(providedValues.id, { ...values }));
      } else {
        return dispatch(createLoanRequest({ ...values }, submit));
      }
    },
    handleSuccess: (redirect) => {
      if (redirect) {
        window.location.assign(redirect);
      }
    },
    handleErrors: () => {},
  });

  const transactionTypes = ["Purchase", "Refinance"];

  const initialValues = providedValues ? merge(cloneDeep(baseValues), cloneDeep(providedValues)) : baseValues

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
                <div className="border-gray-200 px-4 py-5 sm:px-6 grid grid-cols-1 gap-y-4 gap-x-8 lg:grid-cols-4 sm:grid-cols-2">
                  <div className="sm:col-span-full border-b my-2 text-lg leading-5 font-medium text-gray-900 flex w-full justify-between">
                    Loan Amount Requested
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
                  <div className="sm:col-span-full border-b my-2 text-lg leading-5 font-medium text-gray-900">
                    Property To Be Financed Location
                  </div>
                  <div className="sm:col-span-2">
                    <InputField
                      name="locationCity"
                      type="text"
                      label="City"
                      color="congress-blue"
                      required={true}
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
                  {/* <div className="sm:col-span-2">
                <Select
                  name="locationCounty"
                  options={[]}
                  label={"County"}
                  requires={"locationState"}
                  isClearable={true}
                />
              </div> */}
                  <div className="sm:col-span-full border-b my-2 text-lg leading-5 font-medium text-gray-900">
                    Your Contact Info
                  </div>
                  <div className="sm:col-span-2">
                    <InputField
                      name="borrowerName"
                      type="text"
                      label="Full Name"
                      color="congress-blue"
                      required={true}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <InputField
                      name="borrowerMobileNumber"
                      type="text"
                      label="Mobile Number"
                      color="congress-blue"
                      required={true}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <InputField
                      name="borrowerEmail"
                      type="text"
                      label="Email Address"
                      color="congress-blue"
                      required={true}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <InputField
                      name="borrowerCity"
                      type="text"
                      label="City"
                      color="congress-blue"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Select
                      name="borrowerState"
                      options={stateOptions}
                      label={"State"}
                      isClearable={true}
                    />
                  </div>
                  <div className="sm:col-span-full border-b my-2 text-lg leading-5 font-medium text-gray-900">
                    Property Details
                  </div>
                  <div className="sm:col-span-2">
                    <Select
                      name="propertyType"
                      options={propertyTypeOptions}
                      label={"Property Type"}
                      required={true}
                    />
                  </div>
                  {/*
                  <div className="sm:col-span-2">
                    <InputField
                      name="unitQuantity"
                      type="number"
                      label="Number of Units / Pad Sites"
                      color="congress-blue"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <InputField
                      name="netRentableSquareFeet"
                      type="number"
                      label="Net Rentable Square Footage"
                      color="congress-blue"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <InputField
                      percentage={true}
                      name="physicalOccupancy"
                      type="number"
                      label="Physical Occupancy"
                      color="congress-blue"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <InputField
                      name="yearBuilt"
                      type="number"
                      label="Year Built"
                      color="congress-blue"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <InputField
                      name="tenantConcentration"
                      type="text"
                      label="Any Tenant Concentration (employer; student, section 8, etc.)"
                      color="congress-blue"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <InputField
                      name="starRating"
                      type="text"
                      label="Star Rating (for MHC/MHP)"
                      color="congress-blue"
                    />
                  </div> */}
                  <div className="sm:col-span-full">
                    <InputField
                      name="propertyComments"
                      type="textarea"
                      label="Comments (enter any other details you may wish lender to know)"
                      color="congress-blue"
                    />
                  </div>
                  <div className="sm:col-span-full border-b my-2 text-lg leading-5 font-medium text-gray-900">
                    Transaction Details
                  </div>
                  <div className="sm:col-span-2">
                    <Select
                      name="typeOfFinancing"
                      options={typeOfFinancingOptions}
                      label={"Type of Financing Requested"}
                      isMulti={true}
                    />
                  </div>
                  <RadioGroup
                    className="sm:col-span-full"
                    value={values.transactionType}
                    onChange={(value) =>
                      setFieldValue("transactionType", value)
                    }
                  >
                    <RadioGroup.Label className="sr-only">
                      Transaction Type
                    </RadioGroup.Label>
                    <div className="bg-white rounded-md -space-y-px">
                      {transactionTypes.map((transaction, settingIdx) => (
                        <RadioGroup.Option
                          key={settingIdx}
                          value={transaction}
                          className={({ checked }) =>
                            classNames(
                              settingIdx === 0
                                ? "rounded-tl-md rounded-tr-md"
                                : "",
                              settingIdx === transactionTypes.length - 1
                                ? "rounded-bl-md rounded-br-md"
                                : "",
                              checked
                                ? "bg-congress-blue-50 border-congress-blue-200 z-10"
                                : "border-gray-200",
                              touched.transactionType && errors.transactionType
                                ? "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                : "",
                              "relative border p-4 flex cursor-pointer focus:outline-none"
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <span
                                className={classNames(
                                  checked
                                    ? "bg-congress-blue-600 border-transparent"
                                    : "bg-white border-gray-300",
                                  active
                                    ? "ring-2 ring-offset-2 ring-congress-blue-500"
                                    : "",
                                  "h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center"
                                )}
                                aria-hidden="true"
                              >
                                <span className="rounded-full bg-white w-1.5 h-1.5" />
                              </span>
                              <div className="ml-3 flex flex-col w-full">
                                <RadioGroup.Label
                                  as="span"
                                  className={classNames(
                                    checked
                                      ? "text-congress-blue-900"
                                      : "text-gray-900",
                                    "block text-sm font-medium"
                                  )}
                                >
                                  {transaction}
                                </RadioGroup.Label>
                                {checked && (
                                  <RadioGroup.Description
                                    as="span"
                                    className={classNames(
                                      checked
                                        ? "text-congress-blue-700"
                                        : "text-gray-500",
                                      "block text-sm w-full"
                                    )}
                                  >
                                    {transaction === "Purchase" && (
                                      <div className="border-t w-full border-gray-200 py-5 grid grid-cols-1 gap-y-4 gap-x-8 lg:grid-cols-4 sm:grid-cols-2">
                                        <div className="sm:col-span-2">
                                          <InputField
                                            money={true}
                                            name="purchasePrice"
                                            color="congress-blue"
                                            type="number"
                                            label={"Price"}
                                            step="1000"
                                          />
                                        </div>
                                        <div className="sm:col-span-2">
                                          <Select
                                            name="purchaseUnderContract"
                                            options={
                                              foreignNationalsConsideredOptions
                                            }
                                            label={"Under Contract"}
                                            required={
                                              values.transactionType ===
                                              "Purchase"
                                            }
                                          />
                                        </div>
                                        <div className="sm:col-span-2">
                                          <InputField
                                            name="purchaseClosingDate"
                                            type="datepicker"
                                            label="Closing Date"
                                            color="congress-blue"
                                          />
                                        </div>
                                      </div>
                                    )}
                                    {transaction === "Refinance" && (
                                      <div className="border-t w-full border-gray-200 py-5 grid grid-cols-1 gap-y-4 gap-x-8 lg:grid-cols-4 sm:grid-cols-2">
                                        <div className="sm:col-span-2">
                                          <InputField
                                            money={true}
                                            name="refinancePropertyValue"
                                            color="congress-blue"
                                            type="number"
                                            label={"Property Value"}
                                            step="1000"
                                          />
                                        </div>
                                        <div className="sm:col-span-2">
                                          <InputField
                                            money={true}
                                            name="refinanceOutstandingLoanBalance"
                                            color="congress-blue"
                                            type="number"
                                            label={"Outstanding Loan Balance"}
                                            step="1000"
                                            required={
                                              values.transactionType ===
                                              "Refinance"
                                            }
                                          />
                                        </div>
                                      </div>
                                    )}
                                  </RadioGroup.Description>
                                )}
                              </div>
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                    {touched.transactionType && errors.transactionType ? (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.transactionType}
                      </p>
                    ) : null}
                  </RadioGroup>
                  {/* <div className="sm:col-span-full border-b my-2 text-lg leading-5 font-medium text-gray-900">
                    Sponsor Details
                  </div>
                  <div className="sm:col-span-2">
                    <InputField
                      name="numberKeyPrincipals"
                      color="congress-blue"
                      type="number"
                      label={
                        "Number of Key Principals (individuals who will sign the loan)"
                      }
                      step="1"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <InputField
                      money={true}
                      name="sponsorCombinedLiquidity"
                      color="congress-blue"
                      type="number"
                      label={"Combined Liquidity"}
                      step="1000"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <InputField
                      money={true}
                      name="sponsorCombinedNetWorth"
                      color="congress-blue"
                      type="number"
                      label={"Combined Net Worth"}
                      step="1000"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <InputField
                      name="sponsorCombinedYearsExperience"
                      color="congress-blue"
                      type="number"
                      label={"Combined Years Experience"}
                      step="1"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <InputField
                      name="sponsorCreditIssuesDisclosed"
                      type="text"
                      label="Any Credit Issues to Disclose"
                      color="congress-blue"
                    />
                  </div>
                  <div className="sm:col-span-full">
                    <InputField
                      name="sponsorComments"
                      type="textarea"
                      label="Comments"
                      color="congress-blue"
                    />
                  </div> */}
                  <div className="sm:col-span-full border-b my-2 text-lg leading-5 font-medium text-gray-900">
                    Transaction Summary
                  </div>
                  <div className="sm:col-span-full">
                    <p className="text-md text-gray-700 font-normal mt-0">
                      Provide more detail on the loan request. State any “hot
                      buttons” you may have. If cash out, state purpose of the
                      cash out. If recently rehabbed/repositioned or to be
                      rehabbed, discuss capital improvements (summary of work
                      completed or to be completed along with costs). If refi,
                      discuss date purchased, capital improvement dollars
                      invested, any history surrounding the repositioning and
                      purpose of the refi if other than a pending maturity. If
                      purchase, discuss plans for the property, cap rate,
                      submarket fundamentals, etc.
                    </p>
                  </div>
                  <div className="sm:col-span-full">
                    <InputField
                      name="transactionSummary"
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
                  {providedValues
                    ? "Update Loan Request"
                    : "Submit Loan Request"}
                </button>
                {/* {!providedValues && <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-congress-blue-500 shadow-sm px-4 py-2 bg-white text-base font-medium text-congress-blue-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    onSubmit(values, false);
                  }}
                >
                  Save Loan Request Draft
                </button>} */}
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default withGlobalProviders(LoanRequestForm);
