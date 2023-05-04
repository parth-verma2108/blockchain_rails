import React from "react";

import PageBody from "../../general/PageBody";
import withGlobalProviders from "../../../general/withGlobalProvider";
import LoanRequestForm from "./forms/LoanRequestForm";

function New() {
  return (
    <PageBody>
      <div className="py-10 bg-gray-100 flagged">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900 text-shadow-sm">
              Request Loan
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 ">
            <main>
              <div className="mt-8">
                <div className="relative bg-gray-800 sm:rounded-md shadow-lg">
                  <div className="h-56 bg-deep-sea-600 flex justify-center items-center sm:rounded-l-md sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2">
                    <img
                      className="h-56 object-cover object-center sm:rounded-l-md"
                      src="https://lenderprism-public.s3.us-east-2.amazonaws.com/lender_request.svg"
                      alt=""
                    />
                  </div>
                  <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                    <div className="md:ml-auto md:w-1/2 md:pl-10">
                      <h2 className="text-base font-semibold uppercase tracking-wider text-gray-300">
                        Start a conversation with a direct lender.
                      </h2>
                      <p className="mt-3 text-lg text-gray-100">
                        Complete as many of the following items as possible to
                        start a conversation with one or more lenders that you
                        select.
                      </p>
                      <p className="mt-3 text-lg text-gray-100">
                        This form captures high-level information; disregard any
                        fields that don’t pertain to your transaction. Not all
                        fields are required but complete as much as possible to
                        help lenders get a good idea of your loan request.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <main>
              {/* Page header */}
              <div className="mt-8 ">
                <LoanRequestForm />
              </div>
            </main>
          </div>
        </main>
      </div>
    </PageBody>
  );
}

export default withGlobalProviders(New);
