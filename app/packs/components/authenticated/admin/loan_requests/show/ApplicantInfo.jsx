/* This example requires Tailwind CSS v2.0+ */
import { PaperClipIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";

export default function ApplicantInfo({ loanRequest }) {
  const {
    userFullName,
    userEmail,
    userOfficePhone,
    userCellularPhone,
    loanAmountCents,
    locationCity,
    locationState,
    locationPostalCode,
    borrowerName,
    borrowerEmail,
    borrowerMobileNumber,
    borrowerCity,
    borrowerState,
    propertyType,
    typeOfFinancing,
    unitQuantity,
    netRentableSquareFeet,
    physicalOccupancy,
    yearBuilt,
    tenantConcentration,
    starRating,
    propertyComments,
    numberKeyPrincipals,
    sponsorCombinedLiquidity,
    sponsorCombinedNetWorth,
    sponsorCombinedYearsExperience,
    sponsorCreditIssuesDisclosed,
    sponsorComments,
    transactionSummary
  } = loanRequest.attributes;

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          User Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Details of user that completed application.
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {userFullName || "None"}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {userEmail || "None"}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Office phone</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {userOfficePhone || "None"}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Cell phone</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {userCellularPhone || "None"}
            </dd>
          </div>

          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Attachments</dt>
            <dd className="mt-1 text-sm text-gray-900">
              <ul
                role="list"
                className="divide-y divide-gray-200 rounded-md border border-gray-200"
              >
                <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="ml-2 w-0 flex-1 truncate">
                      multifamily_application.pdf
                    </span>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Download
                    </a>
                  </div>
                </li>
                {/* <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="ml-2 w-0 flex-1 truncate">
                      coverletter_back_end_developer.pdf
                    </span>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Download
                    </a>
                  </div>
                </li> */}
              </ul>
            </dd>
          </div>
        </dl>
      </div>

      <dd className="">
        <div className="border-gray-200 px-4 py-5 sm:px-6 grid grid-cols-1 gap-y-4 gap-x-8 lg:grid-cols-4 sm:grid-cols-2">
          <div className="sm:col-span-full border-b my-2 text-lg leading-5 font-medium text-gray-900 flex w-full justify-between">
            Loan Amount Requested
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">
              Loan Amount Requested
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {loanAmountCents || "None"}
            </dd>
          </div>
          <div className="sm:col-span-full border-b my-2 text-lg leading-5 font-medium text-gray-900">
            Property To Be Financed Location
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">City</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {locationCity || "None"}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">State</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {locationState || "None"}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Postal Code</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {locationPostalCode || "N/A"}
            </dd>
          </div>
          {/* <div className="sm:col-span-2">
                <Select
                  <dd className="mt-1 text-sm text-gray-900">
              {locationCounty"
                  options={[]}
                  <dt className="text-sm font-medium text-gray-500">"County"}
                  requires={"locationState"}
                  isClearable={true}
                />
              </div> */}
          <div className="sm:col-span-full border-b my-2 text-lg leading-5 font-medium text-gray-900">
            Your Contact Info
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Full Name</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {borrowerName || "N/A"}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Mobile Number</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {borrowerMobileNumber || "N/A"}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Email Address</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {borrowerEmail || "N/A"}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">City</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {borrowerCity || "N/A"}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">State</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {borrowerState || "N/A"}
            </dd>
          </div>
          <div className="sm:col-span-full border-b my-2 text-lg leading-5 font-medium text-gray-900">
            Property Details
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Property Type</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {propertyType || "N/A"}
            </dd>
          </div>
          {/* 
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">
              Number of Units / Pad Sites
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {unitQuantity || "N/A"}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">
              Net Rentable Square Footage
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {netRentableSquareFeet || "N/A"}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">
              Physical Occupancy
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {physicalOccupancy || "N/A"}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Year Built</dt>
            <dd className="mt-1 text-sm text-gray-900">{yearBuilt || "N/A"}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">
              Any Tenant Concentration (employer; student, section 8, etc.)
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {tenantConcentration || "N/A"}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">
              Star Rating (for MHC/MHP)
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {starRating || "N/A"}
            </dd>
          </div> */}
          <div className="sm:col-span-full">
            <dt className="text-sm font-medium text-gray-500">
              Comments (enter any other details you may wish lender to know)
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {propertyComments || "N/A"}
            </dd>
          </div>
          <div className="sm:col-span-full border-b my-2 text-lg leading-5 font-medium text-gray-900">
            Transaction Details
          </div>
          <div className="sm:col-span-full border-b my-2 text-lg leading-5 font-medium text-gray-900">
            Sponsor Details
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">
              Number of Key Principals (individuals who will sign the loan)
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {numberKeyPrincipals || "N/A"}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">
              Combined Liquidity
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {sponsorCombinedLiquidity || "N/A"}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">
              Combined Net Worth
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {sponsorCombinedNetWorth || "N/A"}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">
              Combined Years Experience
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {sponsorCombinedYearsExperience || "N/A"}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">
              Any Credit Issues to Disclose
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {sponsorCreditIssuesDisclosed || "N/A"}
            </dd>
          </div>
          <div className="sm:col-span-full">
            <dt className="text-sm font-medium text-gray-500">Comments</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {sponsorComments || "N/A"}
            </dd>
          </div>
          <div className="sm:col-span-full border-b my-2 text-lg leading-5 font-medium text-gray-900">
            Transaction Summary
          </div>
          <div className="sm:col-span-full">
            <dt className="text-sm font-medium text-gray-500">Comments</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {transactionSummary || "N/A"}
            </dd>
          </div>
        </div>
      </dd>
    </div>
  );
}
