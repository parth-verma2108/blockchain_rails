import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import filter from "lodash/filter";
import map from "lodash/map";

import withGlobalProviders from "../../../../general/withGlobalProvider";
import { fetchLoanRequestQuotes } from "../../../../../actions/loanRequestQuotesActions";

import QuoteListItem from "./QuoteListItem";
import QuoteListEmpty from "./QuoteListEmpty";

function QuotesList({ quoteTab, setQuoteTab, loanRequestId }) {
  const [visibleQuotes, setVisibleQuotes] = useState([]);
  const [processedTab, setProcessedTab] = useState();
  const dispatch = useDispatch();

  const selectLoanRequestQuotes = createSelector(
    (state) => state.loanRequestQuotes.items,
    (loanRequestQuotes) =>
      filter(
        loanRequestQuotes,
        (loanRequestQuote) => loanRequestQuote.attributes.loanRequestId === loanRequestId
      )
  );

  const loanRequestQuotes = useSelector(selectLoanRequestQuotes);

  useEffect(() => {
    dispatch(fetchLoanRequestQuotes({ loanRequestId }));
  }, [dispatch]);

  useEffect(() => {
    if (loanRequestQuotes && loanRequestQuotes.length > 0 && quoteTab !== processedTab) {
      switch (quoteTab) {
        case "new":
          setVisibleQuotes(filter(loanRequestQuotes, ({ attributes }) => !(attributes.interestedAt || attributes.notInterestedAt)))
          setProcessedTab(quoteTab);
          break;
        case "interested":
          setVisibleQuotes(filter(loanRequestQuotes, ({ attributes }) => attributes.interestedAt))
          setProcessedTab(quoteTab);
          break;
        case "not_interested":
          setVisibleQuotes(filter(loanRequestQuotes, ({ attributes }) => attributes.notInterestedAt))
          setProcessedTab(quoteTab);
          break;
        case "all":
        default:
          setVisibleQuotes(loanRequestQuotes)
          setProcessedTab(quoteTab);
          break;
      }
    }
  }, [quoteTab, loanRequestQuotes])

  return (
    <>
      {visibleQuotes && visibleQuotes.length > 0 && map(visibleQuotes, ({ id }) => <QuoteListItem key={id} {...{ loanRequestId, id }} />)}
      {(!visibleQuotes || visibleQuotes.length === 0) && <QuoteListEmpty {...{ setQuoteTab }} />}
    </>
  );
}

export default withGlobalProviders(QuotesList);
