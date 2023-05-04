import React from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function QuoteTab({ name, value, quoteTab, setQuoteTab }) {
  return (
    <span
      key={name}
      onClick={() => setQuoteTab(value)}
      className={classNames(
        quoteTab === value
          ? 'border-congress-blue-500 text-congress-blue-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
        'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm cursor-pointer'
      )}
      aria-current={quoteTab === value ? 'page' : undefined}
    >
      {name}
    </span>
  )
}