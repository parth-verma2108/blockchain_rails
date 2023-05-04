import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import { createUser } from "../../../../actions/userActions";
import withGlobalProviders from "../../../general/withGlobalProvider";
import InputField from "../../../forms/InputField";
import { createHandleSubmit } from "../../../../utility/helpers";

const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
  terms: false
};

const validationSchema = yup.object().shape({
  email: yup.string().email().required("Email is a required field"),
  password: yup
    .string()
    .required("Please enter your password")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .when("password", {
      is: (password) => (password && password.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref("password")], "Password doesn't match"),
    }),
  terms: yup.bool().required('Must agree to terms to use this service').oneOf([true], 'Must agree to terms to use this service')
});

function New() {
  const dispatch = useDispatch();

  const onSubmit = createHandleSubmit({
    handleSubmit: (values) => {
      return dispatch(createUser({ ...values, user_type: "lender" }));
    },
    handleSuccess: () => {
      window.location.assign("../../");
    },
    handleErrors: () => {},
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-8 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="https://lenderprism-public.s3.us-east-2.amazonaws.com/logo-brandmark-dark-blue.png"
          alt=""
        />
        <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <a
            href="/login"
            className="font-medium text-deep-sea-600 hover:text-deep-sea-500"
          >
            sign in with your existing account.
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Formik {...{ initialValues, validationSchema, onSubmit }}>
            <Form className="space-y-6">
              <InputField
                name="email"
                type="email"
                label="Email address"
                color="deep-sea"
                autoComplete="email"
                required={true}
              />
              <InputField
                name="password"
                type="password"
                label="Password"
                color="deep-sea"
                autoComplete="new-password"
                required={true}
              />
              <InputField
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                color="deep-sea"
                autoComplete="new-password"
                required={true}
              />
              <div className="mt-3">
                <label>
                  <Field type="checkbox" name="terms" className="focus:ring-congress-blue-500 h-4 w-4 text-congress-blue-600 border-gray-300 rounded" />
                  <span class="text-gray-500 ml-3 mt-2">I agree to the </span>
                </label>
                <span class="text-gray-500 mt-2"><a className="underline text-congress-blue cursor-pointer" target="_blank" rel="noopener noreferrer" href="/terms">terms of use</a>.</span>
                <ErrorMessage name="terms" component="div" className="text-sm text-red-600" />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-deep-sea-600 hover:bg-deep-sea-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-deep-sea-500"
                >
                  Create account
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
      <div className="max-w-7xl mx-auto text-center py-8 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h2 className="text-center text-2xl font-extrabold text-gray-900">
          <span className="block">Not a lender?</span>
          {/* <span className="block">Start your free trial today.</span> */}
        </h2>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <a
              href="/registration/borrower"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-congress-blue-600 hover:bg-congress-blue-700"
            >
              Borrower registration
            </a>
          </div>
          <div className="ml-6 inline-flex">
            <a
              href="/registration/broker"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700"
            >
              Mortgage Broker registration
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withGlobalProviders(New);
