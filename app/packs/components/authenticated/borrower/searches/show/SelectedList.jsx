import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import map from "lodash/map";
import difference from "lodash/difference";

import withGlobalProviders from "../../../../general/withGlobalProvider";
import SelectedListItem from "./SelectedListItem";
import { createHandleSubmit } from "../../../../../utility/helpers";
import { createUserSavedOrganizations, fetchUserSavedOrganizations } from "../../../../../actions/userSavedOrganizationActions";

function SelectedList({
  selectedOrganizations,
  items,
  updateSelectedOrganizations,
  setSelectedOrganizations,
  searchId,
  userSavedOrganizations,
}) {
  const dispatch = useDispatch();

  if (!items || items.length === 0) return null;

  const onSubmit = createHandleSubmit({
    handleSubmit: () => {
      const newItems = difference(selectedOrganizations, userSavedOrganizations);
      return dispatch(
        createUserSavedOrganizations(newItems, searchId)
      );
    },
    handleSuccess: () => {
      return dispatch(fetchUserSavedOrganizations())
      // window.location.assign("../../");
    },
    handleErrors: () => {},
  });

  return (
    <>
      <div className="px-4 py-4 sm:px-6 flex flex-row justify-between">
        <div
          id="notes-title"
          className="text-lg leading-5 font-medium text-gray-900"
        >
          {items.length} Selected Lenders
        </div>
      </div>
      <ul
        className="divide-y divide-gray-200 overflow-auto"
        style={{ maxHeight: "50rem" }}
      >
        {map(items, (id) => (
          <SelectedListItem
            {...{
              key: id,
              id,
              updateSelectedOrganizations,
              userSavedOrganizations,
            }}
          />
        ))}
      </ul>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-congress-blue-600 text-base font-medium text-white hover:bg-congress-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-congress-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={onSubmit}
        >
          Save Lenders
        </button>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => {
            setSelectedOrganizations(userSavedOrganizations);
          }}
        >
          Clear
        </button>
      </div>
    </>
  );
}

export default withGlobalProviders(SelectedList);
