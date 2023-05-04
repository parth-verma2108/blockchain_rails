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
              Dashboard
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            {/* Replace with your content */}
            Cool stuff
            {/* /End replace */}
          </div>
        </main>
      </div>
    </PageBody>
  );
}

export default withGlobalProviders(Dashboard);
