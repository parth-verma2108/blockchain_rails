import React, { Fragment } from "react";
import PageBody from "../general/PageBody";
import withGlobalProviders from "../../../components/general/withGlobalProvider";

function Dashboard() {
  // const user = useSelector((state) => state.session.currentUser);

  return (
    <PageBody>
      <div className="py-10 bg-gray-100 flagged">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Early Access
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <main>
              {/* Page header */}
              <div className="mt-8">
                <div class="bg-white">
                  <div class="py-16 xl:py-36 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
                    <div class="max-w-max lg:max-w-7xl mx-auto">
                      <div class="relative z-10 mb-8 md:mb-2 md:px-6">
                        <div class="text-base max-w-prose lg:max-w-none flex justify-center">
                          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Welcome to LenderPrism
                          </p>
                        </div>
                      </div>
                      <div class="relative">
                        <svg
                          class="hidden md:block absolute top-0 right-0 -mt-20 -mr-20"
                          width="404"
                          height="384"
                          fill="none"
                          viewBox="0 0 404 384"
                          aria-hidden="true"
                        >
                          <defs>
                            <pattern
                              id="95e8f2de-6d30-4b7e-8159-f791729db21b"
                              x="0"
                              y="0"
                              width="20"
                              height="20"
                              patternUnits="userSpaceOnUse"
                            >
                              <rect
                                x="0"
                                y="0"
                                width="4"
                                height="4"
                                class="text-gray-200"
                                fill="currentColor"
                              />
                            </pattern>
                          </defs>
                          <rect
                            width="404"
                            height="384"
                            fill="url(#95e8f2de-6d30-4b7e-8159-f791729db21b)"
                          />
                        </svg>
                        <svg
                          class="hidden md:block absolute bottom-0 left-0 -mb-20 -ml-20"
                          width="404"
                          height="384"
                          fill="none"
                          viewBox="0 0 404 384"
                          aria-hidden="true"
                        >
                          <defs>
                            <pattern
                              id="7a00fe67-0343-4a3c-8e81-c145097a3ce0"
                              x="0"
                              y="0"
                              width="20"
                              height="20"
                              patternUnits="userSpaceOnUse"
                            >
                              <rect
                                x="0"
                                y="0"
                                width="4"
                                height="4"
                                class="text-gray-200"
                                fill="currentColor"
                              />
                            </pattern>
                          </defs>
                          <rect
                            width="404"
                            height="384"
                            fill="url(#7a00fe67-0343-4a3c-8e81-c145097a3ce0)"
                          />
                        </svg>
                        <div class="relative md:bg-white md:p-6">
                          <div class="mt-8 inline-flex">
                            <div class="mt-6 text-center prose-lg text-gray-500 lg:mt-0">
                              <p className="max-w-7">
                                Thank you for updating your lending parameters.
                                If you have any questions, comments, or would
                                like to provide additional information not
                                captured in the questionnaire please{" "}
                                <a
                                  className="underline text-congress-blue cursor-pointer"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  href="mailto:support@lenderprism.zohodesk.com"
                                >
                                  contact us via email
                                </a>
                                .
                              </p>
                              <p>Thank you for exploring LenderPrism.</p>
                              <span className="text-congress-blue font-medium">
                                Tony Talamas
                              </span>
                              <br />
                              Co-Founder
                            </div>
                            {/* <a href="#" class="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-congress-blue-600 hover:bg-congress-blue-700"> Contact sales </a> */}
                          </div>
                        </div>
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

export default withGlobalProviders(Dashboard);
