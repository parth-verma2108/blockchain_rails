import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as yup from "yup";

import withGlobalProviders from "../../general/withGlobalProvider";
import InputField from "../../forms/InputField";
import { createHandleSubmit } from "../../../utility/helpers";

import { updatePassword } from "../../../actions/passwordActions";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import merge from "lodash/merge";

const initialValues = {
  password: "",
};

const validationSchema = yup.object().shape({
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
});

function Edit() {
  const location = useLocation();
  const dispatch = useDispatch();

  const params = Object.fromEntries(new URLSearchParams(location.search));

  const onSubmit = createHandleSubmit({
    handleSubmit: (values) => {
      return dispatch(
        updatePassword(
          merge(
            {},
            values,
            params
          )
        )
      );
    },
    handleSuccess: () => {
      window.location.assign("../../");
    },
    handleErrors: () => {
      toast.error("Reset password token is invalid");
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
          marginTop: 60,
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
          Change your password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Formik {...{ initialValues, validationSchema, onSubmit }}>
            <Form className="space-y-6">
              <InputField
                name="password"
                type="password"
                label="New Password"
                color="congress-blue"
                autoComplete="new-password"
                required={true}
              />
              <InputField
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                color="congress-blue"
                autoComplete="new-password"
                required={true}
              />

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-deep-sea-600 hover:bg-deep-sea-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-deep-sea-500"
                >
                  Change my password
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default withGlobalProviders(Edit);
