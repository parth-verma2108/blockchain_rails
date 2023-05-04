import React from "react";

export default function Unsubmitted({ editPath }) {
  return (
    <div className="mt-8">
      {/* <div className="px-4 py-4 sm:px-6 bg-white shadow-lg sm:rounded-lg sm:overflow-hidden"> */}
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Loan Request Not Submitted</h3>
          <p className="mt-1 text-sm text-gray-500">Start receiving quotes from thousands of banks by completing your Loan Request.</p>
          <div className="mt-6">
            <a
              href={editPath}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-congress-blue-600 hover:bg-congress-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-congress-blue-500"
            >
              Continue
            </a>
          </div>
        </div>
      {/* </div> */}
    </div>
  )
}
