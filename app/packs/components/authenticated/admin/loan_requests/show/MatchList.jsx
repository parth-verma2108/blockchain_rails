import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import filter from "lodash/filter";
import map from "lodash/map";

import withGlobalProviders from "../../../../general/withGlobalProvider";
import { fetchLoanRequestMatches } from "../../../../../actions/loanRequestMatchesActions";

import MatchListItem from "./MatchListItem";
import MatchListEmpty from "./MatchListEmpty";

function MatchList({ matchTab, setMatchTab, loanRequestId }) {
  const [visibleMatches, setVisibleMatches] = useState([]);
  const [processedTab, setProcessedTab] = useState();
  const dispatch = useDispatch();

  const selectLoanRequestMatches = createSelector(
    (state) => state.loanRequestMatches.items,
    (loanRequestMatches) =>
      filter(
        loanRequestMatches,
        (loanRequestMatch) =>
          loanRequestMatch.attributes.loanRequestId === loanRequestId && !(loanRequestMatch.attributes.notInterestedAt)
      )
  );

  const loanRequestMatches = useSelector(selectLoanRequestMatches);

  useEffect(() => {
    dispatch(fetchLoanRequestMatches({ loanRequestId }));
  }, [dispatch]);

  useEffect(() => {
    if (loanRequestMatches && loanRequestMatches.length > 0 && matchTab !== processedTab) {
      switch (matchTab) {
        case "new":
          setVisibleMatches(filter(loanRequestMatches, ({ attributes }) => !(attributes.interestedAt || attributes.notInterestedAt)))
          setProcessedTab(matchTab);
          break;
        case "interested":
          setVisibleMatches(filter(loanRequestMatches, ({ attributes }) => attributes.interestedAt))
          setProcessedTab(matchTab);
          break;
        case "not_interested":
          setVisibleMatches(filter(loanRequestMatches, ({ attributes }) => attributes.notInterestedAt))
          setProcessedTab(matchTab);
          break;
        case "all":
        default:
          setVisibleMatches(loanRequestMatches)
          setProcessedTab(matchTab);
          break;
      }
    }
  }, [matchTab, loanRequestMatches])

  return (
    <>
      {visibleMatches && visibleMatches.length > 0 && map(visibleMatches, ({ id }) => <MatchListItem key={id} {...{ loanRequestId, id }} />)}
      {(!visibleMatches || visibleMatches.length === 0) && <MatchListEmpty {...{ setMatchTab }} />}
    </>
  );
}

export default withGlobalProviders(MatchList);
