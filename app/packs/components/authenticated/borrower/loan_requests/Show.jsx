import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PageBody from "../../general/PageBody";
import withGlobalProviders from "../../../general/withGlobalProvider";
import { fetchLoanRequests } from "../../../../actions/loanRequestActions";

import Unsubmitted from "./show/Unsubmitted";
import Processing from "./show/Processing";
import GeneratingQuotes from "./show/GeneratingQuotes";
import Complete from "./show/Complete";
import QuoteTabs from "./show/QuoteTabs";
import QuotesList from "./show/QuotesList";

import { progressWidth } from "./show/utils";
import MatchList from "./show/MatchList";
import ShowSection from "../searches/show/ShowSection";

function Show({ loanRequestId }) {
  const dispatch = useDispatch();
  const loanRequest = useSelector(
    (state) => state.loanRequests.items[loanRequestId]
  );
  const [progress, setProgress] = useState(0);
  const [matchTab, setMatchTab] = useState("all");
  const [quoteTab, setQuoteTab] = useState("all");

  useEffect(() => {
    if (!loanRequest) {
      dispatch(fetchLoanRequests(loanRequestId));
    }
  }, [dispatch, loanRequest]);

  useEffect(() => {
    if (loanRequest) {
      switch (loanRequest.attributes.status) {
        case "closed":
          setProgress(3);
          break;
        case "quoting":
          setProgress(2);
          break;
        case "processing":
          setProgress(1);
          break;
        case "draft":
        default:
          break;
      }
    }
  }, [loanRequest]);

  if (!loanRequest) return null;

  const { editPath, loanAmountCents, propertyType } = loanRequest.attributes;

  return (
    <PageBody>
      <div className="py-10 bg-gray-100 flagged">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
            <h1 className="text-3xl font-bold leading-tight text-gray-900 text-shadow-sm">
              Request of $
              {(loanAmountCents / 100.0)
                .toFixed()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
              for {propertyType || "Unspecified Property"}
            </h1>
            <a
              href="/loans"
              className="ml-3 h-10 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-congress-blue-600 hover:bg-congress-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-congress-blue-500"
            >
              View All
            </a>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 ">
            <main>
              <div className="mt-8 ">
                <h4 className="sr-only">Status</h4>
                <p className="text-sm font-medium text-gray-900">
                  {progress === 0 &&
                    "Waiting for loan request to be submitted..."}
                  {progress === 1 && "Matching loan request to lenders..."}
                  {progress === 2 && "Generating quotes..."}
                  {progress === 3 && "All quotes finalized."}
                </p>
                <div className="mt-6" aria-hidden="true">
                  <div className="bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={
                        "h-2 rounded-full " +
                        (progress === 3
                          ? "bg-deep-sea-600"
                          : "bg-congress-blue-600")
                      }
                      style={{ width: progressWidth[progress] }}
                    />
                  </div>
                  <div className="hidden sm:grid grid-cols-4 text-sm font-medium text-gray-600 mt-6">
                    <div className="text-congress-blue-600">
                      Submit Loan Request
                    </div>
                    <div
                      className={`text-center ${
                        progress > 0 && "text-congress-blue-600"
                      }`}
                    >
                      Matching
                    </div>
                    <div
                      className={`text-center ${
                        progress > 1 && "text-congress-blue-600"
                      }`}
                    >
                      Generating Quotes
                    </div>
                    <div
                      className={`text-right ${
                        progress > 2 && "text-congress-blue-600"
                      }`}
                    >
                      Complete
                    </div>
                  </div>
                </div>
              </div>
              {progress === 0 && <Unsubmitted {...{ editPath }} />}
              {progress === 1 && <Processing />}
              {progress === 2 && <GeneratingQuotes />}
              {progress === 3 && <Complete />}
              {/* {progress < 2 && (
                <QuoteTabs
                  {...{ quoteTab: matchTab, setQuoteTab: setMatchTab, title: "Matches" }}
                />
              )} */}
              {progress < 2 && (
                <MatchList {...{ matchTab, setMatchTab, loanRequestId }} />
              )}
              {progress >= 2 && <QuoteTabs {...{ quoteTab, setQuoteTab }} />}
              {progress >= 2 && (
                <QuotesList {...{ quoteTab, setQuoteTab, loanRequestId }} />
              )}
            </main>
          </div>
        </main>
        {loanRequest.attributes.searchId && (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between mt-8">
              <h1 className="text-3xl font-bold leading-tight text-gray-900 text-shadow-sm">
                Geographical Fuzzy Matches
              </h1>
              <a
                href={`/lenders/search/${loanRequest.attributes.searchId}`}
                className="ml-3 h-10 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-congress-blue-600 hover:bg-congress-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-congress-blue-500"
              >
                Manage Prospector Search
              </a>
            </div>
            <main>
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 ">
                <main>
                  <div className="mt-8 ">
                    <ShowSection searchId={loanRequest.attributes.searchId} />
                  </div>
                </main>
              </div>
            </main>
          </>
        )}
      </div>
    </PageBody>
  );
}

export default withGlobalProviders(Show);
