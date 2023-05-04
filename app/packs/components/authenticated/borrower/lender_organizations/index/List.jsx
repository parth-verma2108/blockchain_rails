import React from "react";
import { useSelector } from "react-redux";

import map from "lodash/map";

import withGlobalProviders from "../../../../../components/general/withGlobalProvider";

import ListItem from "./ListItem";
import EmptyState from "./EmptyState";

function List({ selected, handleClick, removeSavedOrganization }) {
  const { loaded, items } = useSelector(
    (state) => state.userSavedOrganizations
  );

  return (
    <ul className="divide-y divide-gray-200 overflow-auto">
      {loaded && items.length === 0 && <EmptyState />}
      {map(items, (id) => (
        <ListItem {...{ key: id, id, selected, handleClick, removeSavedOrganization }} />
      ))}
    </ul>
  );
}

export default withGlobalProviders(List);
