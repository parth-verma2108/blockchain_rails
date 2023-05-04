import React from "react";
import { useSelector } from "react-redux";
import includes from "lodash/includes";

import { Transition } from "@headlessui/react";

import {
  BuildingOfficeIcon,
  PlusIcon as PlusIconSolid,
} from "@heroicons/react/20/solid";

import withGlobalProviders from "../../../../general/withGlobalProvider";

function ListItem({ id, selectedOrganizations, updateSelectedOrganizations }) {
  const item = useSelector((state) => state.organizations.items[id]);

  if (!item) return null;

  const userSelected = includes(selectedOrganizations, item.id);

  return (
    <Transition
      appear={true}
      enter="transition-opacity duration-250"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-250"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      show={true && !userSelected}
    >
      <li key={item.id}>
        <a href="#" className="block hover:bg-gray-50">
          <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center">
              <p className="text-md font-medium text-deep-sea-600 truncate">
                {item.attributes.name}
              </p>
              {/* <div className="ml-2 flex-shrink-0 flex">
                <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </p>
              </div> */}
            </div>
            <div className="mt-2 sm:flex sm:justify-between">
              <div className="sm:flex text-sm">
                <BuildingOfficeIcon
                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <p>
                  {item.relationships.organizationBranches.data.length}{" "}
                  {item.relationships.organizationBranches.data.length == 1
                    ? "Branch"
                    : "Branches"}
                </p>
                {/* <p className="flex items-center text-sm text-gray-500">
                  <ArrowSmDownIcon
                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  $
                  {(
                    parseInt(item.attributes.minimumLoanAmountCents) / 100
                  ).toLocaleString()}
                </p>
                <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                  <ArrowSmUpIcon
                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  $
                  {(
                    parseInt(item.attributes.maximumLoanAmountCents) / 100
                  ).toLocaleString()}
                </p> */}
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                {/* <BuildingOfficeIcon
                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <p>
                  {item.relationships.organizationBranches.data.length}{" "}
                  {item.relationships.organizationBranches.data.length == 1
                    ? "Branch"
                    : "Branches"}
                </p> */}
                <button
                  type="button"
                  className={
                    "ml-3 inline-flex items-center p-1 border border-congress-blue-700 rounded-full shadow-sm text-congress-blue bg-white hover:bg-congress-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-congress-blue-500 cursor-pointer"
                  }
                  style={{ marginTop: -25 }}
                  onClick={() => updateSelectedOrganizations(item.id)}
                >
                  <PlusIconSolid
                    className={"h-5 w-5 text-congress-blue-700"}
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>
        </a>
      </li>
    </Transition>
  );
}

export default withGlobalProviders(ListItem);
