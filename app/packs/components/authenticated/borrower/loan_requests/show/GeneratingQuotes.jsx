import React from "react";

export default function GeneratingQuotes() {
  return (
    <div className="mt-8">
      <div className="text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">Generating Quotes</h3>
        <p className="mt-1 text-sm text-gray-500">Your loan request has been matched with lenders and we are beginning to receive quotes.</p>
        <p className="mt-1 text-sm text-gray-500">Check back regularly as more quotes may continue to be generated during this phase.</p>
        <p className="mt-1 text-sm text-gray-500">Please indicate which quotes below you are interested in, and we will connect you with the lender.</p>
        <p className="mt-1 text-sm text-gray-500 underline italic">Marking interest in a quote is non-binding and is not an agreement.</p>
      </div>
    </div>
  )
}
