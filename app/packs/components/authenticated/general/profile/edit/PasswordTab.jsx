import React from "react";
import { useSelector, useDispatch } from "react-redux";

import withGlobalProviders from "../../../../general/withGlobalProvider";
import { createHandleSubmit } from "../../../../../utility/helpers";

import { initialValues, validationSchema } from "./passwordHelpers";

import { Formik, Form } from "formik";
import InputField from "../../../../forms/InputField";
import { updatePassword } from "../../../../../actions/profileActions";
import toast from "react-hot-toast";

function PasswordTab() {
  const session = useSelector((state) => state.session.currentUser);
  const dispatch = useDispatch();

  if (!session) return null;

  const onSubmit = createHandleSubmit({
    handleSubmit: (values) => {
      return dispatch(updatePassword(values));
    },
    handleSuccess: () => {
      toast.success("Password updated");
    },
    handleErrors: () => {
      toast.error("Unable to update password");
    },
  });

  return (
    <div className="divide-y divide-gray-200 lg:col-span-9">
      <Formik {...{ initialValues, validationSchema, onSubmit }}>
        <Form>
          <div className="py-6 px-4 sm:p-6 lg:pb-8">
            <div>
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Password
              </h2>
              {/* <p className="mt-1 text-sm text-gray-500">
                This information will be displayed publicly so be careful what
                you share.
              </p> */}
            </div>

            <div className="mt-6 grid grid-cols-12 gap-6">
              <div className="col-span-12 sm:col-span-6">
                <InputField
                  name="oldPassword"
                  type="password"
                  label="Old Password"
                  color="congress-blue"
                  autoComplete="password"
                  required={true}
                />
              </div>
              <br />
              <div className="col-span-12 sm:col-span-6">
                <InputField
                  name="password"
                  type="password"
                  label="New Password"
                  color="congress-blue"
                  autoComplete="new-password"
                  required={true}
                />
              </div>
              <br />
              <div className="col-span-12 sm:col-span-6">
                <InputField
                  name="confirmPassword"
                  type="password"
                  label="Confirm New Password"
                  color="congress-blue"
                  autoComplete="new-password"
                  required={true}
                />
              </div>
            </div>
          </div>

          {/* Privacy section */}
          <div className="mt-4 py-4 px-4 flex justify-end sm:px-6 bg-gray-50">
            {/* <button
              type="button"
              className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-congress-blue-500"
            >
              Cancel
            </button> */}
            <button
              type="submit"
              className="ml-5 bg-congress-blue-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-congress-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-congress-blue-500"
            >
              Save
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default withGlobalProviders(PasswordTab);
