import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import join from "lodash/join"

import { Transition } from "@headlessui/react";

import withGlobalProviders from "../../../../general/withGlobalProvider";

function ListItem({ id }) {
  const loanRequest = useSelector(state => state.loanRequests.items[id])

  if (!loanRequest) return null;

  const {
    loanAmountCents,
    propertyType,
    createdAt,
    updatedAt,
    locationState,
    postalCode,
    locationCity,
    typeOfFinancing,
    showPath,
    userFullName
  } = loanRequest.attributes;

  return (
    <Transition
      appear={true}
      enter="transition-opacity duration-250"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-250"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      show={true}
    >
      <div>
        <div className="bg-white shadow-lg overflow-hidden sm:rounded-lg">
          <div className="px-4 py-3 sm:px-6 flex justify-between">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Request of $
                {(loanAmountCents / 100.0)
                  .toFixed()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
                for {propertyType || "Unspecified Property"} | {userFullName}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Created: {moment(createdAt).format("MMMM Do [at] h:mm A ")} |
                Last Updated: {moment(updatedAt).format("MMMM Do [at] h:mm A ")}
              </p>
            </div>
            <div className="flex items-center">
              <span className="relative z-0 inline-flex shadow-sm rounded-md">
                <a
                  href={showPath}
                  className="relative inline-flex items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-congress-blue-500 focus:z-10 focus:outline-none focus:ring-1 focus:ring-congress-blue-500 focus:border-congress-blue-500"
                >
                  View
                </a>
                {/* <a
                  href={"/lenders/search/" + id}
                  className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-congress-blue-500 focus:z-10 focus:outline-none focus:ring-1 focus:ring-congress-blue-500 focus:border-congress-blue-500"
                >
                  View
                </a>
                <Menu as="span" className="-ml-px relative block">
                  {({ open }) => (
                    <>
                      <Menu.Button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-congress-blue-500 focus:border-congress-blue-500">
                        <span className="sr-only">Open options</span>
                        <ChevronDownIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="origin-top-right absolute right-0 mt-2 -mr-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <div className="py-1">
                            <Menu.Item>
                              <a
                                href={editPath}
                                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                              >
                                Edit
                              </a>
                            </Menu.Item>
                            <Menu.Item>
                              <a
                                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                                onClick={handleDelete}
                              >
                                Delete
                              </a>
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu> */}
              </span>
            </div>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">City</dt>
                <dd className="mt-1 text-sm text-gray-900">{locationCity}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">State</dt>
                <dd className="mt-1 text-sm text-gray-900">{locationState}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Postal Code
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{postalCode}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Type of Financing
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {join(typeOfFinancing, ", ")}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </Transition>
  );
}

export default withGlobalProviders(ListItem);