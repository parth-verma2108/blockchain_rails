import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import withGlobalProviders from "../../../general/withGlobalProvider";
import PageBody from "../../general/PageBody";
import { fetchLoanRequests } from '../../../../actions/loanRequestActions';

import List from "./index/List"

function Index() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLoanRequests());
  }, [dispatch]);

  return (
    <PageBody>
      <div className="py-10 bg-gray-100 flagged">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
            <h1 className="text-3xl font-bold leading-tight text-gray-900 text-shadow-sm">
              Loan Requests
            </h1>
            <a
              href="/loans/new"
              className="ml-3 h-10 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-congress-blue-600 hover:bg-congress-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-congress-blue-500"
            >
              New
            </a>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <main>
              {/* Page header */}
              <div className="mt-8">
                <List />
              </div>
            </main>
          </div>
        </main>
      </div>
    </PageBody>
  );
}

export default withGlobalProviders(Index);
