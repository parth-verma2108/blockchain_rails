import React, { useState } from "react";
import { useDispatch } from "react-redux";

import toast from "react-hot-toast";
import includes from "lodash/includes";

import withGlobalProviders from "../../../general/withGlobalProvider";
import PageBody from "../../general/PageBody";
import { createPassword } from "../../../../actions/admin/passwordActions";

function Index({ lendingParameters: { data } }) {
  const dispatch = useDispatch();

  const [resetIds, setResetIds] = useState([]);

  const resetPassword = (userId) => {
    setResetIds(resetIds.concat(userId))
    dispatch(createPassword(userId)).then(() => {
      toast.success(
        "Password setting instructions sent"
      );
    })
  }
  return (
    <PageBody>
      <div className="py-10 bg-gray-100 flagged">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
            <h1 className="text-3xl font-bold leading-tight text-gray-900 text-shadow-sm">
              Lending Parameters
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <main>
              {/* Page header */}
              <div className="mt-8">
                <div className="flex flex-col">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Company
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Name
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Loan Range
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Properties Financed
                              </th>
                              <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Edit</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {data.map(({ attributes }) => (
                              <tr key={attributes.id}>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                  {attributes.companyName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">
                                        {attributes.firstName}{" "}
                                        {attributes.lastName}
                                      </div>
                                      <div className="text-sm text-gray-500">
                                        {attributes.email}
                                      </div>
                                      <div>
                                        <button
                                          type="button"
                                          disabled={includes(
                                            resetIds,
                                            attributes.userId
                                          )}
                                          onClick={
                                            includes(resetIds, attributes.userId)
                                              ? () => {}
                                              : () =>
                                                  resetPassword(attributes.userId)
                                          }
                                          className="inline-flex items-center rounded border border-gray-300 bg-white disabled:bg-gray-400 disabled:cursor-not-allowed px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-congress-blue-500 focus:ring-offset-2"
                                        >
                                          Send Set Password Email
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    Min $
                                    {attributes.minimumLoanAmount.toLocaleString(
                                      "en-US"
                                    )}
                                  </div>
                                  <div className="text-sm text-gray-900">
                                    Max $
                                    {attributes.maximumLoanAmount.toLocaleString(
                                      "en-US"
                                    )}
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                  {attributes.propertyTypesFinanced.join(", ")}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <a
                                    href={`entry/${attributes.id}/edit`}
                                    className="text-congress-blue-600 hover:text-congress-blue-900"
                                  >
                                    Edit
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </main>
      </div>
    </PageBody>
  );
}

export default withGlobalProviders(Index);
