import React from "react";
import { useSelector } from "react-redux";
import { Transition } from "@headlessui/react";

import includes from "lodash/includes";

import withGlobalProviders from "../../../../../components/general/withGlobalProvider";

import {
  BuildingOfficeIcon,
  MinusIcon as MinusIconSolid,
} from "@heroicons/react/20/solid";


function ListItem({ id, selected, handleClick, removeSavedOrganization }) {
  const item = useSelector((state) => state.organizations.items[id]);
  if (!item) return null;

  const isSelected = false && includes(selected, item.id);
  return (
    <Transition
      appear={true}
      enter="transition-opacity duration-50"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-250"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      show={true}
    >
      <li
        key={item.id}
        onClick={() => handleClick(item.id, isSelected)}
        className={isSelected ? "bg-congress-blue-700" : "bg-white"}
      >
        <a
          href="#"
          className={
            isSelected ? "block hover:bg-congress-blue-500" : "block hover:bg-gray-50"
          }
        >
          <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center">
              <p
                className={
                  isSelected
                    ? "text-md font-medium text-white truncate"
                    : "text-md font-medium text-deep-sea-600 truncate"
                }
              >
                {item.attributes.name}
              </p>
              {/* <div className="ml-2 flex-shrink-0 flex">
                <p
                  className={
                    isSelected
                      ? "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-50 text-green-800"
                      : "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                  }
                >
                  Active
                </p>
              </div> */}
            </div>
            <div className="mt-2 sm:flex sm:justify-between">
              <div className="sm:flex text-sm">
                <BuildingOfficeIcon
                  className={
                    isSelected
                      ? "flex-shrink-0 mr-1.5 h-5 w-5 text-gray-200"
                      : "flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  }
                  aria-hidden="true"
                />
                <p>
                  {item.relationships.organizationBranches.data.length}{" "}
                  {item.relationships.organizationBranches.data.length == 1
                    ? "Branch"
                    : "Branches"}
                </p>
                {/* <p
                  className={
                    isSelected
                      ? "flex items-center text-sm text-gray-100"
                      : "flex items-center text-sm text-gray-500"
                  }
                >
                  <ArrowSmDownIcon
                    className={
                      isSelected
                        ? "flex-shrink-0 mr-1.5 h-5 w-5 text-gray-200"
                        : "flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    }
                    aria-hidden="true"
                  />
                  $
                  {(
                    parseInt(item.attributes.minimumLoanAmountCents) / 100
                  ).toLocaleString()}
                </p>
                <p
                  className={
                    isSelected
                      ? "mt-2 flex items-center text-sm text-gray-100 sm:mt-0 sm:ml-6"
                      : "mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6"
                  }
                >
                  <ArrowSmUpIcon
                    className={
                      isSelected
                        ? "flex-shrink-0 mr-1.5 h-5 w-5 text-gray-200"
                        : "flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    }
                    aria-hidden="true"
                  />
                  $
                  {(
                    parseInt(item.attributes.maximumLoanAmountCents) / 100
                  ).toLocaleString()}
                </p> */}
              </div>
              <div
                className={
                  isSelected
                    ? "mt-2 flex items-center text-sm text-gray-100 sm:mt-0"
                    : "mt-2 flex items-center text-sm text-gray-500 sm:mt-0"
                }
              >
                {/* <BuildingOfficeIcon
                  className={
                    isSelected
                      ? "flex-shrink-0 mr-1.5 h-5 w-5 text-gray-200"
                      : "flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  }
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
                    "ml-3 inline-flex items-center p-1 border border-red-700 rounded-full shadow-sm text-red bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer"
                  }
                  style={{ marginTop: -25 }}
                  onClick={() => {
                    removeSavedOrganization(item.id);
                  }}
                >
                  <MinusIconSolid
                    className={"h-5 w-5 text-red-700"}
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
