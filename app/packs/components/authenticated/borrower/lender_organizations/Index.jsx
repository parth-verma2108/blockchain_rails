import React, { useEffect, Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import concat from "lodash/concat";
import without from "lodash/without";
import uniq from "lodash/uniq";

import PageBody from "../../general/PageBody";
import withGlobalProviders from "../../../../components/general/withGlobalProvider";

import {
  fetchUserSavedOrganizations,
  fetchSavedOrganizations,
  destroySavedOrganization,
} from "../../../../actions/userSavedOrganizationActions";

import List from "./index/List";

function Index() {
  const dispatch = useDispatch();
  const { loaded } = useSelector(
    (state) => state.userSavedOrganizations
  );
  const [selected, setSelected] = useState([])

  useEffect(() => {
    dispatch(fetchUserSavedOrganizations());
    dispatch(fetchSavedOrganizations());
  }, [dispatch]);

  const removeSavedOrganization = (id) => {
    dispatch(destroySavedOrganization(id))
  }

  const handleClick = (organizationId, remove = false) => {
    let actionMethod = remove ? without : concat;

    setSelected((previousSelected) =>
      uniq(actionMethod(previousSelected, organizationId))
    );
  };

  if (!loaded) return null;

  return (
    <PageBody>
      <div className="py-10 bg-gray-100 flagged">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900 text-shadow-sm">
              Lenders
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <main>
              {/* Page header */}
              <div className="mt-8 ">
                <section aria-labelledby="notes-title">
                  <div className="bg-white shadow-lg sm:rounded-lg sm:overflow-hidden">
                    <List
                      {...{ selected, handleClick, removeSavedOrganization }}
                    />
                  </div>
                </section>
              </div>
            </main>
          </div>
        </main>
      </div>
    </PageBody>
  );
}

export default withGlobalProviders(Index);
