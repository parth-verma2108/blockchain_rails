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
import ApplicantInfo from "./show/ApplicantInfo";

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

  const { editPath, loanAmountCents, propertyType, userFullName } =
    loanRequest.attributes;

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
              for {propertyType || "Unspecified Property"} | {userFullName}
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
            <main className="mt-8">
              <ApplicantInfo {...{ loanRequest }} />
              <MatchList {...{ matchTab, setMatchTab, loanRequestId }} />
            </main>
          </div>
        </main>
      </div>
    </PageBody>
  );
}

export default withGlobalProviders(Show);
