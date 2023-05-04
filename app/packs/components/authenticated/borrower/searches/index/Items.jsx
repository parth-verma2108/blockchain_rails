import React from "react";
import { useSelector } from "react-redux";
import map from "lodash/map";
import withGlobalProviders from "../../../../general/withGlobalProvider";
import Item from "./Item";
import EmptyState from "./EmptyState";

function Items() {
  const { loaded, items } = useSelector((state) => state.searches);

  if (loaded && !items) return <EmptyState />

  return <div className="flex space-y-6 flex-col">
    {map(items, ({ id }) => <Item {...{ key: id, id }} />)}
  </div>
}

export default withGlobalProviders(Items);
