import React, { Fragment } from "react";
import {
  ChatBubbleLeftEllipsisIcon,
  ClockIcon,
  SparklesIcon,
  AcademicCapIcon,
  BookmarkSquareIcon,
} from "@heroicons/react/24/outline";

import PageBody from "../authenticated/general/PageBody";

const features = [
  {
    name: "Discuss",
    description:
      "Meet other borrowers, brokers, and lenders. Discuss loan options. Learn about lenders. Get referrals and recommendations. Ask about specific markets.",
    icon: ChatBubbleLeftEllipsisIcon,
  },
  {
    name: "Knowledgebase",
    description:
      "Access a wealth of knowledge from borrowers, brokers, and lending experts.",
    icon: BookmarkSquareIcon,
  },
  {
    name: "Mentor",
    description: "Become a mentor, or discover a mentor in your industry.",
    icon: AcademicCapIcon,
  },
];

export default function Index() {
  return (
    <PageBody>
      <div className="relative overflow-hidden bg-white">
        <div className="relative pt-6 pb-16 sm:pb-24 lg:pb-32">
          <main className="mx-auto mt-16 max-w-7xl px-4 sm:px-6">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left flex flex-col justify-center">
                <h1>
                  <span className="mt-1 block text-4xl font-bold tracking-tight sm:text-3xl xl:text-4xl">
                    <span className="block text-gray-900">
                      Get the Multifamily loan terms that work for you!
                    </span>
                    <span className="block text-congress-blue-500">
                      With the most efficient and transparent loan process.
                    </span>
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  Work with us to identify the best lenders for your needs. Over 10,000 banks, credit unions, and non-bank lenders
                  in over 90,000 locations. Including non-bank lenders like
                  Fannie Mae, Freddie Mac, Life Companies, and Private Debt Funds.
                </p>
                <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="/registration"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-congress-blue-500 px-8 py-3 text-base font-medium text-white hover:bg-congress-blue-600 md:py-4 md:px-10 md:text-lg"
                    >
                      Get started
                    </a>
                  </div>
                  {/* <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                    <a
                      href="#"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-congress-blue-600 hover:bg-gray-50 md:py-4 md:px-10 md:text-lg"
                    >
                      Live demo
                    </a>
                  </div> */}
                </div>
              </div>
              <div className="relative mt-12 sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center">
                {/* <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                  <img
                    className="w-full"
                    src="https://lenderprism-public.s3.us-east-2.amazonaws.com/loan_request_screen.png"
                    alt=""
                  />
                </div> */}
                <div
                  className="pl-0 lg:pl-4 mr-0 lg:-mr-48 lg:px-0 lg:m-0 lg:relative lg:h-full"
                  style={{ minHeight: 430 }}
                >
                  <img
                    className="w-full shadow-congress-blue-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                    src="https://lenderprism-public.s3.us-east-2.amazonaws.com/loan_request_match_screenshot.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="bg-white">
        <main>
          {/* Hero section */}
          {/* <div className="relative">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100 pb-4" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pb-8">
              <div className="relative shadow-congress-blue-xl sm:rounded-2xl sm:overflow-hidden">
                <div className="bg-white">
                  <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                    <div className="text-center">
                      <a
                        href="/registration"
                        className="inline-flex items-center text-white bg-emerald-600 rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200"
                      >
                        <span className="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-emerald-800 rounded-full">
                          Early Access
                        </span>
                        <span className="ml-4 text-sm">
                          Register now before we launch
                        </span>
                        <ChevronRightIcon
                          className="ml-2 w-5 h-5 text-gray-100"
                          aria-hidden="true"
                        />
                      </a>
                      <h1 className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                        Multifamily & CRE loans
                        <br /> made easy.
                      </h1>
                      <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                        Built for multifamily and commercial real estate
                        borrowers, syndicators, lenders and brokers.
                        <br />
                        <br />
                        LenderPrism is the all-in-one platform to get your loan
                        funded, find new business, connect with peers, become a
                        mentor, or seek mentorship.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {/* Alternating Feature Sections */}
          <div className="relative pt-16 pb-32 overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gray-100"
            />
            <div className="mt-24">
              <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
                <div className="px-4 max-w-xl mx-auto sm:px-6 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2 flex flex-col justify-center">
                  <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                      <span>
                        <span className="block text-gray-900">
                          Find More Lenders.{" "}
                        </span>
                        <span className="block text-gray-900">
                          Get Better Loan Terms.{" "}
                        </span>
                        <span className="block text-congress-blue-500">
                          Get Funded.
                        </span>
                      </span>
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                      With just basic information about your project, your
                      personal advisor will begin matching you with real
                      lenders.
                    </p>
                    <p className="mt-4 text-lg text-gray-600">
                      When you're ready, schedule a call with your advisor to
                      discuss investment objectives and loan structures that are
                      tailored to your specific transaction.
                    </p>
                    <p className="mt-4 text-lg text-gray-600">
                      Your advisor will help you every step of the way in
                      generating "apples to apples" easy to understand
                      comparisions and getting your loan funded.
                    </p>
                    <div className="mt-6">
                      <a
                        href="/registration/lender"
                        className="inline-flex bg-congress-blue-600 bg-origin-border px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-green-xl text-white hover:bg-congress-blue-700 hover:shadow-green-2xl"
                      >
                        Start Now for Free
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1 flex flex-col justify-center">
                  <div
                    className="pl-0 lg:pl-4 mr-0 lg:px-0 lg:m-0 lg:relative lg:h-full"
                    style={{ maxHeight: 385, minHeight: 385 }}
                  >
                    <img
                      className="mx-auto lg:mx-0 w-auto lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                      src="https://lenderprism-public.s3.us-east-2.amazonaws.com/search.png"
                      alt=""
                      style={{ maxHeight: 385, minHeight: 385 }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-36">
              <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
                <div className="px-4 max-w-xl mx-auto sm:px-6 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-1 flex flex-col justify-center">
                  <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                      <span>
                        <span className="block text-gray-900">
                          Are you a lender?
                        </span>
                        <span className="block text-gray-900">
                          Generate more qualified leads.
                        </span>
                        <span className="block text-emerald-800">
                          Close more deals.
                        </span>
                      </span>
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                      Expand your Presence. Get more Leads. Drive New Business.
                      All for free. Set your lending parameters on LenderPrism
                      and start receiving leads from vetted and verified
                      borrowers and brokers.
                    </p>
                    <div className="mt-6">
                      <a
                        href="/registration/lender"
                        className="inline-flex bg-emerald-700 bg-origin-border px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-green-xl text-white hover:bg-emerald-800 hover:shadow-green-2xl"
                      >
                        Start Now for Free
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-start-2">
                  <div
                    className="pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full"
                    style={{ maxHeight: 385, minHeight: 385 }}
                  >
                    <img
                      className="w-full lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                      src="https://lenderprism-public.s3.us-east-2.amazonaws.com/bank.svg"
                      alt=""
                      style={{ maxHeight: 385, minHeight: 385 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gradient Feature Section */}
          {/* <div className="relative bg-white py-16 sm:py-24 lg:py-32">
            <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
              <h2 className="text-base font-semibold tracking-wider text-congress-blue-600 uppercase">
                Community
              </h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                Connect with industry experts.
              </p>
              <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
                The LenderPrism community includes owner-operators, syndicators,
                borrowers, brokers, and lenders. Use the community forum to
                consult with your peers – brainstorm, ask for guidance, seek
                solutions, compare lenders, and get recommendations.
              </p>
              <div className="mt-12">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {features.map((feature) => (
                    <div key={feature.name} className="pt-6">
                      <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                        <div className="-mt-6">
                          <div>
                            <span className="inline-flex items-center justify-center p-3 bg-congress-blue-500 rounded-md shadow-lg">
                              <feature.icon
                                className="h-6 w-6 text-white"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                          <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                            {feature.name}
                          </h3>
                          <p
                            className="mt-5 text-base text-gray-500"
                            style={{ minHeight: 120 }}
                          >
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div> */}

          {/* CTA Section */}
        </main>
      </div>
      <div className="mt-12">
        <div className="max-w-4xl mx-auto py-16 flex flex-col justify-center items-center px-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:flex lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to get started?</span>
            {/* <span className="block bg-congress-blue-500 bg-clip-text text-transparent">
                  Join the conversation now.
                </span> */}
          </h2>
          <div className="mt-6 space-y-4 sm:space-y-0 sm:flex sm:space-x-5">
            <a
              href="/registration/borrower"
              className="flex items-center justify-center bg-congress-blue-600 bg-origin-border px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white hover:bg-congress-blue-700"
            >
              For Borrowers
            </a>
            <a
              href="/registration/lender"
              className="flex items-center justify-center bg-emerald-700 bg-origin-border px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white hover:bg-emerald-800"
            >
              For Lenders
            </a>
            <a
              href="/registration/broker"
              className="flex items-center justify-center bg-amber-600 bg-origin-border px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white hover:bg-amber-700"
            >
              For Brokers
            </a>
          </div>
        </div>
      </div>
    </PageBody>
  );
}
