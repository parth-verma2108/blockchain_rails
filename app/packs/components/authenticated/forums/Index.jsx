import React, { useState } from "react";
import withGlobalProviders from "../../general/withGlobalProvider";
import PageBody from "../general/PageBody";
import Filters from "./general/Filters";
import Posts from "./general/Posts";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Index() {
  const [selectedTab, setSelectedTab] = useState("Recent");

  return (
    <PageBody>
      <div className="py-10 bg-gray-100 flagged">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Forums
            </h1>
            <Filters {...{ selectedTab, setSelectedTab }} />
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <Posts />
          </div>
        </main>
      </div>
    </PageBody>
  );
}

export default withGlobalProviders(Index);
