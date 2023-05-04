import React from "react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-8 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="https://lenderprism-public.s3.us-east-2.amazonaws.com/logo-brandmark-dark-blue.png"
          alt=""
        />
        <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <a
            href="/login"
            className="font-bold text-gray-700 hover:text-gray-800"
          >
            sign in with your existing account.
          </a>
        </p>
      </div>
      <div className="max-w-7xl mx-auto text-center py-8 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h2 className="text-center text-2xl font-extrabold text-gray-900">
          <span className="block">Which best describes you?</span>
          {/* <span className="block">Start your free trial today.</span> */}
        </h2>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md">
            <a
              href="/registration/borrower"
              className="inline-flex items-center shadow justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-congress-blue-600 hover:bg-congress-blue-700"
            >
              Borrower
            </a>
            <a
              href="/registration/lender"
              className="ml-4 inline-flex items-center shadow justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700"
            >
              Lender
            </a>
            <a
              href="/registration/broker"
              className="ml-4 inline-flex items-center shadow justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700"
            >
              Broker
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
