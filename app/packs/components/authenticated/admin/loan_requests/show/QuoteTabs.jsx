import React from "react";
import map from "lodash/map";

import QuoteTab from "./QuoteTab";

const tabs = [
  { name: 'All', value: 'all' },
  { name: 'New', value: 'new' },
  { name: 'Interested', value: 'interested' },
  { name: 'Not Interested', value: 'not_interested' },
]

export default function QuoteTabs({ quoteTab, setQuoteTab, title = "Quotes" }) {
  return (
    <div className="border-b border-gray-200 mt-8">
      <div className="sm:flex sm:items-baseline">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
        <div className="mt-4 sm:mt-0 sm:ml-10">
          <nav className="-mb-px flex space-x-8">
            {map(tabs, ({ name, value }) => (
              <QuoteTab key={value} {...{ name, value, quoteTab, setQuoteTab }} />
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}