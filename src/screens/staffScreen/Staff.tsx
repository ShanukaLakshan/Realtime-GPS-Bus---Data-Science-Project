import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import osm from "./osm-providers";

const Staff = () => {
  const [center, setCenter] = useState({ lat: 7.2906, lng: 80.6337 });
  const ZOOM_LEVEL = 9;

  return (
    <>
      <MapContainer
        center={center}
        zoom={ZOOM_LEVEL}
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer
          url={osm.maptiler.url}
          attribution={osm.maptiler.attribution}
        />
      </MapContainer>
    </>
  );
};

export default Staff;
