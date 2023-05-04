import React, { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

function Navigation() {
  return (
    <header>
      <Popover className="relative bg-white">
        {({ open }) => (
          <>
            <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-6 sm:px-6 md:justify-start md:space-x-10 lg:px-8">
              <div className="flex justify-start lg:w-0 lg:flex-1">
                <a href="#">
                  <span className="sr-only">LenderPrism</span>
                  <img
                    className="h-12 object-cover object-center sm:rounded-l-md"
                    width="155.86"
                    // src="https://lenderprism-public.s3.us-east-2.amazonaws.com/logo_draft.png"
                    src="https://lenderprism-public.s3.us-east-2.amazonaws.com/logo-dark-blue.png"
                    alt=""
                  />
                </a>
              </div>
              <div className="-mr-2 -my-2 md:hidden">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-congress-blue-500">
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
              <Popover.Group
                as="nav"
                className="hidden md:flex space-x-10"
              ></Popover.Group>
              <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                <a
                  href="/login"
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Sign in
                </a>
                <a
                  href="/registration"
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center bg-congress-blue-500 bg-origin-border px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-congress-blue-600"
                >
                  Sign up
                </a>
              </div>
            </div>

            <Transition
              show={open}
              as={Fragment}
              enter="duration-200 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                focus
                static
                className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
              >
                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                  <div className="pt-5 pb-6 px-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <img
                          className="h-12 object-cover object-center sm:rounded-l-md"
                          width="155.86"
                          // src="https://lenderprism-public.s3.us-east-2.amazonaws.com/logo_draft.png"
                          src="https://lenderprism-public.s3.us-east-2.amazonaws.com/logo-dark-blue.png"
                          alt="LenderPrism Logo"
                        />
                      </div>
                      <div className="-mr-2">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-congress-blue-500">
                          <span className="sr-only">Close menu</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                  </div>
                  <div className="py-6 px-5">
                    <div className="mt-6">
                      <a
                        href="/registration"
                        className="w-full flex items-center justify-center bg-congress-blue-500 bg-origin-border px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:congress-blue-600"
                      >
                        Sign up
                      </a>
                      <p className="mt-6 text-center text-base font-medium text-gray-500">
                        Existing user?{" "}
                        <a href="/login" className="text-gray-900">
                          Sign in
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </header>
  );
}

export default Navigation;
