import React from "react";
import { useSelector } from "react-redux";

import withGlobalProviders from "../../../general/withGlobalProvider";


import PageBody from "../../general/PageBody";
import ShowSection from "./show/ShowSection";

function Show({ searchId }) {
  const search = useSelector((state) => state.searches.items[searchId]);

  return (
    <PageBody>
      <div className="py-10 bg-gray-100 flagged">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
            <h1 className="text-3xl font-bold leading-tight text-gray-900 text-shadow-sm">
              {search ? '"' + search.attributes.name + '"' : "Search Results"}
            </h1>
            <a
              href={search ? search.attributes.editPath : "#"}
              className="ml-3 inline-flex items-center h-10 px-4 py-2 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-congress-blue-600 hover:bg-congress-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-congress-blue-500"
            >
              Edit
            </a>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <main>
              {/* Page header */}
              <div className="mt-8 ">
                <ShowSection {...{ searchId }} />
              </div>
            </main>
          </div>
        </main>
      </div>
    </PageBody>
  );
}

export default withGlobalProviders(Show);
