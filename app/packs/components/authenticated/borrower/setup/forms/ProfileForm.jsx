import React from "react";
import { useDispatch } from "react-redux";

import { Formik, Form } from "formik";

import withGlobalProviders from "../../../../general/withGlobalProvider";

import Select from "../../../../forms/SelectField";
import InputField from "../../../../forms/InputField";
import { createHandleSubmit } from "../../../../../utility/helpers";

import {
  initialValues as baseValues,
  validationSchema,
  stateOptions,
} from "./helpers";

import { updateSetup } from "../../../../../actions/setupActions";

function ProfileForm({ providedValues }) {
  const dispatch = useDispatch();
  const onSubmit = createHandleSubmit({
    handleSubmit: (values) => {
      if (providedValues) {
        // return dispatch(updateSearch(providedValues.id, { ...values }));
      } else {
        return dispatch(updateSetup({ ...values }));
      }
    },
    handleSuccess: (redirect) => {
      if (redirect) {
        window.location.assign(redirect);
      }
    },
    handleErrors: () => {},
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
        <Form>
          <dd className="">
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6 grid grid-cols-1 gap-y-4 gap-x-8 lg:grid-cols-4 sm:grid-cols-2">
              <div className="sm:col-span-full border-b my-2 text-lg leading-5 font-medium text-gray-900">
                Personal Profile
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
            </div>
          </dd>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-md">
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-congress-blue-600 text-base font-medium text-white hover:bg-congress-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-congress-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Save Account Settings
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default withGlobalProviders(ProfileForm);
