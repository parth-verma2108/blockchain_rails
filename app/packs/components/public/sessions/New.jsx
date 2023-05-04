import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as yup from "yup";

import withGlobalProviders from "../../general/withGlobalProvider";
import InputField from "../../forms/InputField";
import { createHandleSubmit } from "../../../utility/helpers";

import { createSession } from "../../../actions/sessionActions";
import toast, { Toaster } from "react-hot-toast";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = yup.object().shape({
  email: yup.string().email().required("Email is a required field"),
  password: yup
    .string()
    .required("Please enter your password")
    // .matches(
    //   /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    //   "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    // ),
});

function New() {
  const dispatch = useDispatch();

  const onSubmit = createHandleSubmit({
    handleSubmit: (values) => {
      return dispatch(createSession(values));
    },
    handleSuccess: () => {
      window.location.assign("../../");
    },
    handleErrors: () => {
      toast.error("Invalid email or password");
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-8 sm:px-6 lg:px-8">
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{
          marginTop: 60
        }}
        toastOptions={{
          // Define default options
          className: "",
          duration: 3000,
        }}
      />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="https://lenderprism-public.s3.us-east-2.amazonaws.com/logo-brandmark-dark-blue.png"
          alt=""
        />
        <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        {/* <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <a
            href="/login"
            className="font-medium text-deep-sea-600 hover:text-deep-sea-500"
          >
            sign in with your existing account.
          </a>
        </p> */}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Formik {...{ initialValues, validationSchema, onSubmit }}>
            <Form className="space-y-6">
              <InputField
                name="email"
                type="email"
                label="Email address"
                color="congress-blue"
                autoComplete="email"
                required={true}
              />

              <InputField
                name="password"
                type="password"
                label="Password"
                color="congress-blue"
                autoComplete="new-password"
                required={true}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 text-deep-sea-600 focus:ring-deep-sea-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember_me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="/password-reset"
                    className="font-medium text-deep-sea-600 hover:text-deep-sea-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-deep-sea-600 hover:bg-deep-sea-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-deep-sea-500"
                >
                  Sign in
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
      <div className="max-w-7xl mx-auto text-center py-8 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h2 className="text-center text-2xl font-extrabold text-gray-900">
          <span className="block">Not a member?</span>
          {/* <span className="block">Start your free trial today.</span> */}
        </h2>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <a
              href="/registration/lender"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-deep-sea-600 hover:bg-deep-sea-700"
            >
              Lenders
            </a>
          </div>
          <div className="ml-6 inline-flex">
            <a
              href="/registration/borrower"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-congress-blue-600 hover:bg-congress-blue-700"
            >
              Borrowers
            </a>
          </div>
          <div className="ml-6 inline-flex">
            <a
              href="/registration/broker"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700"
            >
              Brokers
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withGlobalProviders(New);
