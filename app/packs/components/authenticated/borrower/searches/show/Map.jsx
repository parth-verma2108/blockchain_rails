import React, { useState, useCallback, useRef } from "react";
import { useSelector } from "react-redux";

import {
  MapContainer,
  useMap,
  useMapEvents,
  TileLayer,
  Marker,
  Popup,
  Circle,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import map from "lodash/map";
import includes from "lodash/includes";

import withGlobalProviders from "../../../../general/withGlobalProvider";
import { useEventListener } from "../../../../../utility/helpers";
import { greenIcon, blueIcon } from "../../../../../utility/mapIcons";
import MapItem from "./MapItem";
import { useEffect } from "react";
import { circle } from "leaflet";
const fillBlueOptions = { fillColor: "blue" };

function Map({
  locationRange,
  postalCodeLongitude,
  postalCodeLatitude,
  selectedOrganizations,
  updateSelectedOrganizations,
  userSavedOrganizations,
}) {
  const { items } = useSelector((state) => state.organizationBranches);
  const circleRef = useRef()

  let center = [37.09, -95.71];

  if ((postalCodeLatitude, postalCodeLongitude)) {
    center = [postalCodeLatitude, postalCodeLongitude];
  }

  let zoom = 4;

  switch (locationRange) {
    case 10:
      zoom = 11;
      break;
    case 25:
      zoom = 9;
      break;
    case 50:
      zoom = 9;
      break;
    case 75:
      zoom = 8;
      break;
    case 100:
      zoom = 7;
      break;
    case 500:
      zoom = 5;
      break;
    case 1000:
      zoom = 4;
      break;
    case 2000:
      zoom = 3;
      break;
  }

  const [currentZoom, setCurrentZoom] = useState(zoom);
  const [mapItemCount, setMapItemCount] = useState(0);

  const handleZoomEnd = useCallback(
    (event) => {
      setCurrentZoom(event.target._zoom);
    },
    [setCurrentZoom]
  );

  function MapEvents() {
    const map = useMapEvents({
      zoomend: handleZoomEnd,
    });
    return null;
  }

  useEffect(() => {
    window.mapItemCount = mapItemCount;
  }, [mapItemCount])


  useEffect(() => {
    window.circleRef = circleRef;
  }, [circleRef])
  
  return (
    <div style={{ width: "100%", minHeight: 500, display: "flex" }}>
      <MapContainer
        height={500}
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        preferCanvas={true}
        attributionControl={false}
      >
        <MapEvents />
        {locationRange &&
          postalCodeLatitude &&
          postalCodeLongitude &&
          currentZoom <= zoom && (
            <Circle
              center={[postalCodeLatitude, postalCodeLongitude]}
              pathOptions={fillBlueOptions}
              radius={locationRange * 1609.34}
              ref={circleRef}
            />
          )}
        <TileLayer
          prefix={false}
          // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url={
            "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGVuZGVycHJpc20iLCJhIjoiY2txNGhmNXBxMDg2ajJ1cG1pcGg1Znh3bCJ9.WFXaV3skRkQRRYMXUgd6FQ"
          }
        />
        <MarkerClusterGroup disableClusteringAtZoom={13}>
          {map(Object.values(items), (item) => (
            <MapItem
              {...{
                key: item.id,
                item,
                selectedOrganizations,
                updateSelectedOrganizations,
                userSavedOrganizations,
                setMapItemCount
              }}
            />
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}

export default withGlobalProviders(Map);
