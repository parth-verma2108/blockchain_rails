import React from "react";
import { useSelector } from "react-redux";
import map from "lodash/map";
import withGlobalProviders from "../../../../general/withGlobalProvider";

import ListItem from "./ListItem";
import EmptyState from "./EmptyState";

function Items() {
  const { loaded, items } = useSelector((state) => state.loanRequests);

  if (loaded && !items) return <EmptyState />;

  return (
    <div className="flex space-y-6 flex-col">
      {map(items, ({ id }) => (
        <ListItem {...{ key: id, id }} />
      ))}
      {Object.keys(items).length < 3 && <EmptyState next={true} />}
    </div>
  );
}

export default withGlobalProviders(Items);
