import React, { Fragment, useEffect, useState } from "react";
import PageBody from "../general/PageBody";
import withGlobalProviders from "../../../components/general/withGlobalProvider";
import GhostContentAPI from '@tryghost/content-api'
import forEach from "lodash/forEach";
import map from "lodash/map";
import moment from "moment";
import List from "./loan_requests/index/List";
import { useDispatch } from "react-redux";
import { fetchLoanRequests } from "../../../actions/loanRequestActions";

function Dashboard() {
  // const user = useSelector((state) => state.session.currentUser);
  // const [posts, setPosts] = useState([]);

  // const api = new GhostContentAPI({
  //   host: 'https://lenderprism.ghost.io',
  //   key: 'de51275448401f3c6d86e29e76',
  //   version: "v3"
  // });

  // useEffect(() => {
  //   api.posts.browse({ limit: 5, filter: 'featured:true', include: 'tags,authors' }).then((loadedPosts) => {
  //     console.log(loadedPosts[0]);
  //     setPosts(loadedPosts);
  //   });
  // }, [])

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLoanRequests());
  }, [dispatch]);

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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 lg:px-8 flex justify-between">
            <h2 className="text-xl font-bold leading-tight text-gray-900 text-shadow-sm">
              Loan Requests
            </h2>
            <a
              href="/loans/new"
              className="ml-3 h-10 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-congress-blue-600 hover:bg-congress-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-congress-blue-500"
            >
              New
            </a>
          </div>
          <main>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <main>
                {/* Page header */}
                <div className="mt-8">
                  <List />
                </div>
              </main>
            </div>
          </main>
        </main>
      </div>
    </PageBody>
  );
}

export default withGlobalProviders(Dashboard);
