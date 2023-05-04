import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Disclosure, Menu, Popover, Transition } from "@headlessui/react";
import { BellIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import withGlobalProviders from "../../../general/withGlobalProvider";
import { destroySession } from "../../../../actions/sessionActions";

import { ChevronDownIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
import { RectangleStackIcon } from "@heroicons/react/24/outline";

// const navigation = [
//   { name: "Dashboard", href: "/", current: false },
//   { name: "Loans", href: "/loans", current: false },
//   { name: "My Lenders", href: "/lenders", current: false },
//   { name: "Find Lenders", href: "/lenders/search", current: false },
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navigation() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.currentUser);

  const { userType, email, profileMinimum, profile } = user.attributes;

  const userNavigation = [
    { name: "Profile Settings", href: "/profile" },
    {
      name: "Sign out",
      href: user.attributes.destroyUserSessionPath,
      method: () => {
        dispatch(destroySession())
          .then(() => {})
          .catch(() => {
            window.location.assign(window.location.origin);
          });
      },
    },
  ];

  let navigation = [];

  if (userType === "admin" && profileMinimum) {
    navigation = [
      {
        flyout: true,
        name: "Lenders",
        current: false,
        options: [
          {
            name: "Create Lender",
            href: "/entry",
            icon: PlusCircleIcon,
            description:
              "Create a new lender including account, profile, and lending parameter.",
          },
          {
            name: "View All Lenders",
            href: "/entries",
            icon: RectangleStackIcon,
            description:
              "Create a new lender including account, profile, and lending parameter.",
          },
        ],
      },
      {
        name: "Loan Requests",
        href: "/loans",
      },
    ];
  }

  return (
    <Disclosure as="nav" className="bg-white shadow-lg">
      {({ open }) => {
        const pathname = window.location.pathname;

        if (userType === "admin" && profileMinimum) {
          switch (pathname) {
            case "/entry":
              navigation[0].current = true;
              break;
            default:
              break;
          }
        }

        return (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    {/* <h3>LenderPrism 💎</h3> */}
                    <img
                      className="h-12 object-cover object-center sm:rounded-l-md"
                      width="155.86"
                      // src="https://lenderprism-public.s3.us-east-2.amazonaws.com/logo_draft.png"
                      src="https://lenderprism-public.s3.us-east-2.amazonaws.com/logo-dark-blue.png"
                      alt="LenderPrism Logo"
                    />
                  </div>
                  <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                    {navigation.map((item) => {
                      if (item.flyout) {
                        return (
                          <Popover
                            className={classNames(
                              item.current
                                ? "border-congress-blue-500 text-gray-900"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                              "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer"
                            )}
                            style={{ paddingBottom: 6 }}
                            key={item.name}
                          >
                            {({ open }) => (
                              <>
                                <Popover.Button
                                  className={classNames(
                                    open
                                      ? "text-gray-900"
                                      : "text-gray-500 hover:text-gray-700",
                                    "inline-flex items-center px-1 pt-1 text-sm font-medium cursor-pointer"
                                  )}
                                >
                                  {item.name}
                                  <ChevronDownIcon
                                    className={classNames(
                                      open ? "text-gray-600" : "text-gray-400",
                                      "ml-2 h-5 w-5 group-hover:text-gray-500"
                                    )}
                                    aria-hidden="true"
                                  />
                                </Popover.Button>

                                <Transition
                                  as={Fragment}
                                  enter="transition ease-out duration-200"
                                  enterFrom="opacity-0 translate-y-1"
                                  enterTo="opacity-100 translate-y-0"
                                  leave="transition ease-in duration-150"
                                  leaveFrom="opacity-100 translate-y-0"
                                  leaveTo="opacity-0 translate-y-1"
                                >
                                  <Popover.Panel
                                    style={{ top: 57 }}
                                    className="origin-top-left absolute z-10 mt-3 px-2 w-screen max-w-md sm:px-0 z-50"
                                  >
                                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                      <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                        {item.options.map((option) => (
                                          <a
                                            key={option.name}
                                            href={option.href}
                                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
                                          >
                                            <option.icon
                                              className="flex-shrink-0 h-6 w-6 text-congress-blue-600"
                                              aria-hidden="true"
                                            />
                                            <div className="ml-4">
                                              <p className="text-base font-medium text-gray-900">
                                                {option.name}
                                              </p>
                                              <p className="mt-1 text-sm text-gray-500">
                                                {option.description}
                                              </p>
                                            </div>
                                          </a>
                                        ))}
                                      </div>
                                      {item.callsToAction && (
                                        <div className="px-5 py-5 bg-gray-50 space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
                                          {item.callsToAction.map(
                                            (callToAction) => (
                                              <div
                                                key={callToAction.name}
                                                className="flow-root"
                                              >
                                                <a
                                                  href={callToAction.href}
                                                  className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 transition ease-in-out duration-150"
                                                >
                                                  <callToAction.icon
                                                    className="flex-shrink-0 h-6 w-6 text-gray-400"
                                                    aria-hidden="true"
                                                  />
                                                  <span className="ml-3">
                                                    {callToAction.name}
                                                  </span>
                                                </a>
                                              </div>
                                            )
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </Popover.Panel>
                                </Transition>
                              </>
                            )}
                          </Popover>
                        );
                      } else {
                        return (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "border-congress-blue-500 text-gray-900"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                              "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        );
                      }
                    })}
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  {false && profileMinimum && (
                    <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-congress-blue-500">
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  )}

                  {/* Profile dropdown */}
                  {
                    <Menu as="div" className="ml-3 relative">
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="bg-white flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-congress-blue-500">
                              <span className="sr-only">Open user menu</span>
                              {/* <img
                                className="h-8 w-8 rounded-full"
                                src={
                                  //TODO: Replace with user avatar
                                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                }
                                alt=""
                              /> */}
                              <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100 border border-gray-400">
                                <svg
                                  className="h-full w-full text-gray-300"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                              </span>
                            </Menu.Button>
                          </div>
                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              static
                              className="origin-top-right z-50 absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => {
                                    if (item.method) {
                                      return (
                                        <a
                                          onClick={item.method}
                                          className={classNames(
                                            active ? "bg-gray-100" : "",
                                            "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                          )}
                                        >
                                          {item.name}
                                        </a>
                                      );
                                    } else {
                                      return (
                                        <a
                                          href={item.href}
                                          className={classNames(
                                            active ? "bg-gray-100" : "",
                                            "block px-4 py-2 text-sm text-gray-700"
                                          )}
                                        >
                                          {item.name}
                                        </a>
                                      );
                                    }
                                  }}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                  }
                </div>
                <div className="-mr-2 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-congress-blue-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            {profileMinimum && (
              <Disclosure.Panel className="sm:hidden">
                <div className="pt-2 pb-3 space-y-1">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-congress-blue-50 border-congress-blue-500 text-congress-blue-700"
                          : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800",
                        "block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      {/* TODO: Replace with user avatar */}
                      <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100 border border-gray-400">
                        <svg
                          className="h-full w-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {/* //TODO: Replace with user avatar */}
                        {profile &&
                          `${profile.first_name} ${profile.last_name}`}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {/* TODO: Replace with user e-mail */}
                        {email}
                      </div>
                    </div>
                    {/* <button className="ml-auto bg-white flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-congress-blue-500">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button> */}
                  </div>
                  <div className="mt-3 space-y-1">
                    {userNavigation.map((item) => {
                      if (item.method) {
                        <a
                          key={item.name}
                          onClick={item.method}
                          className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 cursor-pointer"
                        >
                          {item.name}
                        </a>;
                      } else {
                        return (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                          >
                            {item.name}
                          </a>
                        );
                      }
                    })}
                  </div>
                </div>
              </Disclosure.Panel>
            )}
          </>
        );
      }}
    </Disclosure>
  );
}

export default withGlobalProviders(Navigation);
