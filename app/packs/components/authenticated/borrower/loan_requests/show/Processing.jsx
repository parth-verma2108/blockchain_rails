import React from "react";

export default function Processing() {
  return (
    <div className="mt-8">
      <div className="text-center">
        <div className="bg-congress-blue-600 rounded-md">
          <div className="mx-auto max-w-3xl py-16 px-4 text-center sm:py-20 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              <span className="block">We've got matches.</span>
              <span className="block">Schedule a call for introductions.</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-congress-blue-100">
              Below is a list of real people we've identified as potential
              matches for your deal. Schedule a call to begin the introduction
              process.
            </p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://calendly.com/tony_talamas/30min"
              className="mt-8 inline-flex w-full items-center justify-center shadow-lg shadow-[#2986FC]/50 rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-congress-blue-600 hover:bg-congress-blue-50 sm:w-auto"
            >
              Schedule A Call
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
