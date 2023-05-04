import React from "react";

export default function EmptyState() {
  return (
    <div
      className="bg-congress-blue-700 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4"
      style={{ minHeight: 500 }}
    >
      <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
        <div className="lg:self-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block text-congress-blue-200">
              Ready to fund your loan?
            </span>
            <span className="block">Connect with lenders today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-white">
            Connect with lenders who are actively financing multifamily &
            commercial real estate.
          </p>
          <a
            href="/lenders/search/new"
            className="mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-congress-blue-600 hover:bg-congress-blue-50"
          >
            Create search
          </a>
        </div>
      </div>
      <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
        <img
          className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
          src="https://lenderprism-public.s3.us-east-2.amazonaws.com/search_screenshot.png"
          alt="App screenshot"
        />
      </div>
    </div>
  );
}
