import React from "react";
import { useSelector } from "react-redux";

import withGlobalProviders from "../../../general/withGlobalProvider";

function SlackInvite() {
  const user = useSelector((state) => state.session.currentUser);

  return (
    <main className="py-10">
      <div className="bg-white rounded-lg shadow overflow-visible">
        <div className="mx-auto max-w-7xl px-8">
          <div className="grid grid-cols-1 gap-8">
            <div className="py-24 w-full">
              <h1 className="mt-4 text-4xl tracking-tight font-extrabold md:mt-5 md:text-6xl lg:mt-6 xl:text-6xl text-center">
                <span className="block">We're creating the future of</span>
                <span className="pb-3 block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-congress-blue-600 md:pb-5">
                  Commercial Real Estate
                </span>
              </h1>
              <p className="text-base text-gray-700 md:text-xl lg:text-lg xl:text-xl  text-center">
                Join us on our Slack workspace and network, share best
                practices, connect, and learn with your peers.
              </p>
              <div className="mt-6 md:mt-12 w-full flex justify-center">
                <a
                  className="mx-auto"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://join.slack.com/t/lenderprism/shared_invite/zt-tc6lls3l-WBHvBlCgrABuKTYIG0_76Q"
                >
                  <button
                    type="submit"
                    className="bg-congress-blue-500 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-congress-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-congress-blue-500"
                  >
                    Join Us On Slack
                  </button>
                </a>
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default withGlobalProviders(SlackInvite);
