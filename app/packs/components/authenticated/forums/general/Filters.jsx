import React from "react";

const tabs = ["Recent", "Most Liked", "Most Replies"];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Filters({ selectedTab, setSelectedTab }) {
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full focus:ring-congress-blue-500 focus:border-congress-blue-500 border-gray-300 rounded-md"
          value={selectedTab}
          onChange={(event) => setSelectedTab(event.currentTarget.value)}
        >
          {tabs.map((tab) => (
            <option key={tab} value={tab}>
              {tab}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <span
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={classNames(
                selectedTab === tab
                  ? "bg-congress-blue-600 text-gray-100"
                  : "text-gray-500 hover:text-gray-700",
                "px-3 py-2 font-medium text-sm rounded-md cursor-pointer"
              )}
              aria-current={selectedTab === tab ? "page" : undefined}
            >
              {tab}
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
}
