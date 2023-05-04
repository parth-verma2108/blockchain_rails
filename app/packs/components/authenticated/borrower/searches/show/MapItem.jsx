import React, { useEffect, useMemo, useState } from "react";
import Popover from "@material-ui/core/Popover";

import { Marker, Popup } from "react-leaflet";
import includes from "lodash/includes";

import { greenIcon, blueIcon } from "../../../../../utility/mapIcons";

function MapItem({
  item,
  selectedOrganizations,
  updateSelectedOrganizations,
  userSavedOrganizations,
  setMapItemCount
}) {
  const selected = includes(
    selectedOrganizations,
    item.attributes.organizationId
  );

  if (!item.attributes.latitude) return null;

  const userSaved = includes(
    userSavedOrganizations,
    item.attributes.organizationId
  );

  useEffect(() => {
    setMapItemCount((prevCount) => prevCount + 1)

    return () => setMapItemCount((prevCount) => prevCount - 1)
  }, [])


  const marker = useMemo(() => {
    return (
      <Marker
        key={item.id}
        icon={selected ? greenIcon : blueIcon}
        position={[
          parseFloat(item.attributes.latitude),
          parseFloat(item.attributes.longitude),
        ]}
      >
        <Popup>
          <div className="text-gray-900" style={{ minWidth: 300 }}>
            <strong className="text-lg leading-6 font-medium">
              {item.attributes.organizationName}
            </strong>
            <br />
            <div className="text-base py-3">
              {item.attributes.street}
              <br />
              {item.attributes.city}, {item.attributes.state}
            </div>
            <div className="sm:flex sm:flex-row-reverse">
              {userSaved ? (
                <div className="items-center text-sm text-gray-500">
                  This lender must be removed from the My Lenders page.
                </div>
              ) : (
                <button
                  type="button"
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm ${
                    selected
                      ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                      : "bg-congress-blue-600 hover:bg-congress-blue-700 focus:ring-congress-blue-500"
                  }`}
                  onClick={() =>
                    updateSelectedOrganizations(
                      item.attributes.organizationId,
                      selected
                    )
                  }
                >
                  {selected ? "Remove" : "Select"}
                </button>
              )}
            </div>
          </div>
        </Popup>
      </Marker>
    );
  }, [selected, userSaved]);

  return marker;
}

export default MapItem;
