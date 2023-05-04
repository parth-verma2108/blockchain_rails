import React from "react";

import PageBody from "../../general/PageBody";
import withGlobalProviders from "../../../general/withGlobalProvider";
import SearchForm from "./forms/SearchForm";

function New() {
  return (
    <PageBody>
      <div className="py-10 bg-gray-100 flagged">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900 text-shadow-sm">
              Find Lenders
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <main>
              {/* Page header */}
              <div className="mt-8 ">
                <SearchForm />
              </div>
            </main>
          </div>
        </main>
      </div>
    </PageBody>
  );
}

export default withGlobalProviders(New);
