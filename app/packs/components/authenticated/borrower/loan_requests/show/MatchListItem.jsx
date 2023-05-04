import React from "react";
import { useDispatch, useSelector } from "react-redux";


import withGlobalProviders from "../../../../general/withGlobalProvider";
import { updateLoanRequestMatchInterest } from "../../../../../actions/loanRequestMatchesActions";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function MatchListItem({ loanRequestId, id }) {
  const dispatch = useDispatch();

  // const loanRequest = useSelector((state) => state.loanRequests.items[loanRequestId]);
  const loanRequestMatch = useSelector((state) => state.loanRequestMatches.items[id]);

  const handleInterest = (interest) => {
    dispatch(updateLoanRequestMatchInterest({ loanRequestId, id, interest }))
  }

  if (!loanRequestMatch) return null;

  const {
    shortId,
    minimumLoanAmountCents,
    maximumLoanAmountCents,
    bankName,
    typeOfFinancing,
    publishedAt,
  } = loanRequestMatch.attributes;

  return (
    <div className="mt-8">
      <div className="bg-white shadow-lg sm:rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
            <div className="ml-4 mt-2">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Match ({bankName})
              </h3>
            </div>
            <div className="ml-4 mt-4 flex-shrink-0 flex">
              <div class="inline-flex rounded-md shadow">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://calendly.com/tony_talamas/30min"
                  class="inline-flex items-center cursor-pointer justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-base font-medium text-white hover:bg-emerald-700"
                >
                  Schedule Call
                </a>
              </div>
              {/* <button
                type="button"
                onClick={
                  loanRequestMatch.attributes.notInterestedAt
                    ? () => {}
                    : () => handleInterest(false)
                }
                className={classNames(
                  loanRequestMatch.attributes.notInterestedAt
                    ? "bg-red-50 cursor-auto"
                    : "bg-white hover:bg-red-50",
                  "relative inline-flex items-center px-4 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:red-500"
                )}
              >
                {loanRequestMatch.attributes.notInterestedAt && (
                  <CheckIcon
                    className="-ml-1 mr-2 h-5 w-5 text-red-400"
                    aria-hidden="true"
                  />
                )}
                <span>Not Interested</span>
              </button>
              <button
                type="button"
                onClick={
                  loanRequestMatch.attributes.interestedAt
                    ? () => {}
                    : () => handleInterest(true)
                }
                className={classNames(
                  loanRequestMatch.attributes.interestedAt
                    ? "bg-emerald-50 cursor-auto"
                    : "bg-white hover:bg-emerald-50",
                  "ml-3 relative inline-flex items-center px-4 py-2 border border-emerald-300 shadow-sm text-sm font-medium rounded-md text-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:emerald-500"
                )}
              >
                {loanRequestMatch.attributes.interestedAt && (
                  <CheckIcon
                    className="-ml-1 mr-2 h-5 w-5 text-emerald-400"
                    aria-hidden="true"
                  />
                )}
                <span>Interested</span>
              </button> */}
            </div>
          </div>
        </div>
        <div className="px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-4">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Bank Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{bankName}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Minimum Loan Amount
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                $
                {(minimumLoanAmountCents / 100.0)
                  .toFixed()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Maximum Loan Amount
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                $
                {(maximumLoanAmountCents / 100.0)
                  .toFixed()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Financing Services
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{typeOfFinancing}</dd>
            </div>
            {/* <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Presented</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {moment(publishedAt).format("MMMM Do [at] h:mm A ")}
              </dd>
            </div> */}
            {/* <div className="sm:col-span-4">
              <div class="inline-flex rounded-md shadow">
                <a
                  href="#"
                  class="inline-flex items-center justify-center rounded-md border border-transparent bg-emerald-600 px-5 py-3 text-base font-medium text-white hover:bg-emerald-700"
                >
                  Schedule Call
                </a>
              </div>
            </div> */}
          </dl>
        </div>
      </div>
    </div>
  );
}

export default withGlobalProviders(MatchListItem);
