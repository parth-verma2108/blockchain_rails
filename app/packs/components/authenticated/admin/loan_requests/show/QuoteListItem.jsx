import React from "react";
import { useDispatch, useSelector } from "react-redux";

import withGlobalProviders from "../../../../general/withGlobalProvider";
import { updateLoanRequestQuoteInterest } from "../../../../../actions/loanRequestQuotesActions";

import { CheckIcon } from '@heroicons/react/20/solid'
import moment from "moment";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function QuoteListItem({ loanRequestId, id }) {
  const dispatch = useDispatch();

  // const loanRequest = useSelector((state) => state.loanRequests.items[loanRequestId]);
  const loanRequestQuote = useSelector((state) => state.loanRequestQuotes.items[id]);

  const handleInterest = (interest) => {
    dispatch(updateLoanRequestQuoteInterest({ loanRequestId, id, interest }))
  }

  if (!loanRequestQuote) return null;

  const { shortId, loanAmount, interestRate, fixedOrFloating, term, amortization, interestOnlyPeriod, prepaymentPenalty, originationFee, recourse, publishedAt } = loanRequestQuote.attributes

  return (
    <div className="mt-8">
      <div className="bg-white shadow-lg sm:rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
            <div className="ml-4 mt-2">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Quote ({shortId})</h3>
            </div>
            <div className="ml-4 mt-4 flex-shrink-0 flex">
              <button
                type="button"
                onClick={loanRequestQuote.attributes.notInterestedAt ? () => { } : () => handleInterest(false)}
                className={classNames(
                  loanRequestQuote.attributes.notInterestedAt
                    ? 'bg-red-50 cursor-auto'
                    : 'bg-white hover:bg-red-50',
                  "relative inline-flex items-center px-4 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:red-500"
                )}
              >
                {loanRequestQuote.attributes.notInterestedAt && <CheckIcon className="-ml-1 mr-2 h-5 w-5 text-red-400" aria-hidden="true" />}
                <span>Not Interested</span>
              </button>
              <button
                type="button"
                onClick={loanRequestQuote.attributes.interestedAt ? () => { } : () => handleInterest(true)}
                className={classNames(
                  loanRequestQuote.attributes.interestedAt
                    ? 'bg-emerald-50 cursor-auto'
                    : 'bg-white hover:bg-emerald-50',
                  "ml-3 relative inline-flex items-center px-4 py-2 border border-emerald-300 shadow-sm text-sm font-medium rounded-md text-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:emerald-500"
                )}
              >
                {loanRequestQuote.attributes.interestedAt && <CheckIcon className="-ml-1 mr-2 h-5 w-5 text-emerald-400" aria-hidden="true" />}
                <span>Interested</span>
              </button>
            </div>
          </div>
        </div>
        <div className="px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-4">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Loan Amount
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{loanAmount}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Interest Rate
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{interestRate}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Fixed or Floating
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{fixedOrFloating}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Term
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{term}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Amortization
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{amortization}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Interest-Only Period
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{interestOnlyPeriod}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Prepayment Penalty
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{prepaymentPenalty}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Origination Fee
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{originationFee}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Recourse
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{recourse}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Presented
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{ moment(publishedAt).format("MMMM Do [at] h:mm A ") }</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

export default withGlobalProviders(QuoteListItem);
