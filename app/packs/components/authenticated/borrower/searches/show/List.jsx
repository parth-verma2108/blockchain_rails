import React from "react";
import { useSelector } from "react-redux";
import map from "lodash/map";

import withGlobalProviders from "../../../../general/withGlobalProvider";
import ListItem from "./ListItem";

function List({ selectedOrganizations, updateSelectedOrganizations }) {
  const { items } = useSelector((state) => state.organizations);

  return (
    <ul
      className="divide-y divide-gray-200 overflow-auto"
      style={{ maxHeight: 500, minHeight: 500 }}
    >
      {map(items, ({ id }) => (
        <ListItem
          {...{
            key: id,
            id,
            selectedOrganizations,
            updateSelectedOrganizations,
          }}
        />
      ))}
    </ul>
  );
}

export default withGlobalProviders(List);
