import { EyeIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function QuoteListEmpty({ setQuoteTab }) {
  return (
    <div className="text-center mt-8">
      <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 className="mt-2 text-sm font-medium text-gray-900">No Quotes</h3>
      <p className="mt-1 text-sm text-gray-500">No Quotes match this filter</p>
      <div className="mt-6">
        <button
          type="button"
          onClick={() => setQuoteTab('all')}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-congress-blue-600 hover:bg-congress-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-congress-blue-500"
        >
          View All Quotes
        </button>
      </div>
    </div>
  )
}