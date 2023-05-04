import React from "react";
import { useSelector, useDispatch } from "react-redux";

import withGlobalProviders from "../../../../general/withGlobalProvider";
import { createHandleSubmit } from "../../../../../utility/helpers";

const user = {
  name: "Debbie Lewis",
  handle: "deblewis",
  email: "debbielewis@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80",
};

import { validationSchema, stateOptions } from "./profileHelpers";

import { Formik, Form } from "formik";
import InputField from "../../../../forms/InputField";
import Select from "../../../../forms/SelectField";
import { updateProfile } from "../../../../../actions/profileActions";
import toast  from "react-hot-toast";

function ProfileTab() {
  const session = useSelector((state) => state.session.currentUser);
  const dispatch = useDispatch();

  if (!session) return null;

  const {
    first_name,
    last_name,
    office_phone,
    cellular_phone,
    company_name,
    title,
  } = session.attributes.profile;

  const initialValues = {
    firstName: first_name || "",
    lastName: last_name,
    officePhone: office_phone,
    personalPhone: cellular_phone,
    companyName: company_name,
    title: title,
    profileState: session.attributes.profileState ? {
      value: session.attributes.profileState,
      label: session.attributes.profileState,
    } : null,
  };

  const onSubmit = createHandleSubmit({
    handleSubmit: (values) => {
      return dispatch(updateProfile(values));
    },
    handleSuccess: () => {
      toast.success("Profile updated");
    },
    handleErrors: () => {},
  });

  return (
    <div className="divide-y divide-gray-200 lg:col-span-9">
      <Formik {...{ initialValues, validationSchema, onSubmit }}>
        <Form>
          <div className="py-6 px-4 sm:p-6 lg:pb-8">
            <div>
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Profile
              </h2>
              {/* <p className="mt-1 text-sm text-gray-500">
                This information will be displayed publicly so be careful what
                you share.
              </p> */}
            </div>

            <div className="mt-6 flex flex-col lg:flex-row">
              <div className="flex-grow grid grid-cols-12 gap-6">
                {/* <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <div className="mt-1 rounded-md shadow-sm flex">
                    <span className="bg-gray-50 border border-r-0 border-gray-300 rounded-l-md px-3 inline-flex items-center text-gray-500 sm:text-sm">
                      workcation.com/
                    </span>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      className="focus:ring-congress-blue-500 focus:border-congress-blue-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                      defaultValue={user.handle}
                    />
                  </div>
                </div>*/}
                <div className="col-span-12 sm:col-span-6">
                  <InputField
                    name="firstName"
                    type="text"
                    label="First Name"
                    color="congress-blue"
                    required={true}
                  />
                </div>
                <div className="col-span-12 sm:col-span-6">
                  <InputField
                    name="lastName"
                    type="text"
                    label="Last Name"
                    color="congress-blue"
                    required={true}
                  />
                </div>
                <div className="col-span-12 sm:col-span-6">
                  <InputField
                    name="companyName"
                    type="text"
                    label="Company Name"
                    color="congress-blue"
                    required={true}
                  />
                </div>
                <div className="col-span-12 sm:col-span-6">
                  <InputField
                    name="title"
                    type="text"
                    label="Job Title"
                    color="congress-blue"
                  />
                </div>
              </div>

              {/* <div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
                <p
                  className="text-sm font-medium text-gray-700"
                  aria-hidden="true"
                >
                  Photo
                </p>
                <div className="mt-1 lg:hidden">
                  <div className="flex items-center">
                    <div
                      className="flex-shrink-0 inline-block rounded-full overflow-hidden h-12 w-12"
                      aria-hidden="true"
                    >
                      <img
                        className="rounded-full h-full w-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-5 rounded-md shadow-sm">
                      <div className="group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-congress-blue-500">
                        <label
                          htmlFor="user-photo"
                          className="relative text-sm leading-4 font-medium text-gray-700 pointer-events-none"
                        >
                          <span>Change</span>
                          <span className="sr-only"> user photo</span>
                        </label>
                        <input
                          id="user-photo"
                          name="user-photo"
                          type="file"
                          className="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden relative rounded-full overflow-hidden lg:block">
                  <img
                    className="relative rounded-full w-40 h-40"
                    src={user.imageUrl}
                    alt=""
                  />
                  <label
                    htmlFor="user-photo"
                    className="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
                  >
                    <span>Change</span>
                    <span className="sr-only"> user photo</span>
                    <input
                      type="file"
                      id="user-photo"
                      name="user-photo"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                    />
                  </label>
                </div>
              </div> */}
            </div>

            <div className="mt-6 grid grid-cols-12 gap-6">
              <div className="col-span-12 sm:col-span-6">
                <InputField
                  name="officePhone"
                  type="text"
                  label="Office Phone"
                  color="congress-blue"
                />
              </div>
              <div className="col-span-12 sm:col-span-6">
                <InputField
                  name="personalPhone"
                  type="text"
                  label="Mobile Phone"
                  color="congress-blue"
                />
              </div>
              <div className="col-span-12 sm:col-span-6">
                <Select
                  name="profileState"
                  options={stateOptions}
                  label={"State In Which You Are Based"}
                  isClearable={true}
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

export default withGlobalProviders(ProfileTab);
