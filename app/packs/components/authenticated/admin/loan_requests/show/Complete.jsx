import React from "react";

export default function Complete() {
  return (
    <div className="mt-8">
      <div className="text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-deep-sea-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">Complete</h3>
        <p className="mt-1 text-sm text-gray-500">Your loan request has been matched with lenders and we have received all available quotes.</p>
        <p className="mt-1 text-sm text-gray-500">Please indicate which quotes below you are interested in, and we will connect you with the lender.</p>
        <p className="mt-1 text-sm text-gray-500 underline italic">Marking interest in a quote is non-binding and is not an agreement.</p>
      </div>
    </div>
  )
}
