import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import concat from "lodash/concat";
import without from "lodash/without";
import uniq from "lodash/uniq";
import union from "lodash/union";
import intersection from "lodash/intersection";

import { CreditCardIcon, UsersIcon } from "@heroicons/react/20/solid";

import List from "./List";
import Map from "./Map";
import {
  fetchSearch,
  fetchSearchResults,
} from "../../../../../actions/searchActions";

import SelectedList from "./SelectedList";
import { fetchUserSavedOrganizations } from "../../../../../actions/userSavedOrganizationActions";

const tabs = [
  { name: "List", icon: UsersIcon },
  { name: "Map", icon: CreditCardIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ShowSection({ searchId }) {
  const dispatch = useDispatch();
  const { loaded, items } = useSelector((state) => state.organizations);
  const userSavedOrganizations = useSelector(
    (state) => state.userSavedOrganizations.items
  );

  const [currentTab, setCurrentTab] = useState("Map");
  const [selectedOrganizations, setSelectedOrganizations] = useState([]);
  const search = useSelector((state) => state.searches.items[searchId]);

  useEffect(() => {
    dispatch(fetchSearchResults(searchId));
    dispatch(fetchSearch(searchId));
    dispatch(fetchUserSavedOrganizations());
  }, [dispatch]);

  useEffect(() => {
    setSelectedOrganizations((previousSelectedOrganizations) => {
      const savedOrganizations = intersection(
        userSavedOrganizations,
        Object.keys(items)
      );
      return uniq(union(previousSelectedOrganizations, savedOrganizations));
    });
  }, [userSavedOrganizations, items]);

  if (!loaded || !search || !userSavedOrganizations) return null;

  const { name, locationRange, postalCodeLongitude, postalCodeLatitude } =
    search.attributes;

  const updateSelectedOrganizations = (organizationId, remove = false) => {
    let actionMethod = remove ? without : concat;

    setSelectedOrganizations((previousSelectedOrganizations) =>
      uniq(actionMethod(previousSelectedOrganizations, organizationId))
    );
  };

  return (
    <section aria-labelledby="notes-title">
      <div className="bg-white shadow-lg sm:rounded-lg sm:overflow-hidden">
        <div className="divide-y divide-gray-200">
          <div className="px-4 py-4 sm:px-6 flex flex-row justify-between">
            <div
              id="notes-title"
              className="text-lg leading-5 font-medium text-gray-900"
            >
              Search Results
            </div>
            <div>
              <div className="sm:hidden">
                {/* <label htmlFor="tabs" className="sr-only">
                  Select a tab
                </label> */}
                <select
                  id="tabs"
                  name="tabs"
                  className="block w-full focus:ring-congress-blue-500 focus:border-congress-blue-500 border-gray-300 rounded-md"
                  defaultValue={currentTab}
                  onChange={(event) =>
                    setCurrentTab(event.target.value)
                  }
                >
                  {tabs.map((tab) => (
                    <option key={tab.name} value={tab.name}>
                      {tab.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="hidden sm:block">
                <nav className="flex space-x-2" aria-label="Tabs">
                  {tabs.map((tab) => (
                    <a
                      key={tab.name}
                      className={classNames(
                        tab.name === currentTab
                          ? "bg-blue-100 text-gray-700"
                          : "text-gray-500 hover:text-gray-700",
                        "px-3 py-0.5 font-small text-xs rounded-md cursor-pointer"
                      )}
                      aria-current={
                        tab.name === currentTab ? "page" : undefined
                      }
                      onClick={() => setCurrentTab(tab.name)}
                    >
                      {tab.name}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
          {currentTab === "List" && (
            <List
              {...{
                selectedOrganizations,
                updateSelectedOrganizations,
              }}
            />
          )}
          {currentTab === "Map" && (
            <Map
              {...{
                locationRange,
                postalCodeLongitude,
                postalCodeLatitude,
                selectedOrganizations,
                updateSelectedOrganizations,
                userSavedOrganizations,
              }}
            />
          )}
          <dd className="">
            {selectedOrganizations.length === 0 && (
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6 grid grid-cols-1 gap-y-3 gap-x-2">
                <ul className="-my-5 divide-y divide-gray-200">
                  <li className="py-4">
                    <div className="flex items-center space-x-4">
                      No Lenders Selected
                    </div>
                  </li>
                </ul>
              </div>
            )}
            <SelectedList
              items={selectedOrganizations}
              {...{
                selectedOrganizations,
                updateSelectedOrganizations,
                setSelectedOrganizations,
                searchId,
                userSavedOrganizations,
              }}
            />
          </dd>
        </div>
      </div>
    </section>
  );
}
