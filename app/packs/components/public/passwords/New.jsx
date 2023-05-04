import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as yup from "yup";

import withGlobalProviders from "../../general/withGlobalProvider";
import InputField from "../../forms/InputField";
import { createHandleSubmit } from "../../../utility/helpers";

import { createPassword } from "../../../actions/passwordActions";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

const initialValues = {
  email: "",
};

const validationSchema = yup.object().shape({
  email: yup.string().email().required("Email is a required field"),
});

function New() {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);

  const onSubmit = createHandleSubmit({
    handleSubmit: (values) => {
      return dispatch(createPassword(values));
    },
    handleSuccess: () => {
      toast.success("If an account with this email exists we will send password reset instructions.");
      setDisabled(true);
    },
    handleErrors: () => {
      toast.success(
        "If an account with this email exists we will send password reset instructions."
      );
      setDisabled(true);
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
        <a href="./">
          <img
            className="mx-auto h-12 w-auto"
            src="https://lenderprism-public.s3.us-east-2.amazonaws.com/logo-brandmark-dark-blue.png"
            alt=""
          />
        </a>
        <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
          Forgot your password?
        </h2>
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
                disabled={disabled}
              />

              <div>
                <button
                  type="submit"
                  disabled={disabled}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-deep-sea-600 hover:bg-deep-sea-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-deep-sea-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Send me reset password instructions
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default withGlobalProviders(New);
