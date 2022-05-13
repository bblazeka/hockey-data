import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import styled from "styled-components";

import { getLogo } from "util/assets";
import { GetMapboxApi } from "util/common";

mapboxgl.accessToken = GetMapboxApi();

const MapContainer = styled.div`
  min-height: 50vh;
  height: 100%;
`;

const Map = (props) => {
  const mapContainerRef = useRef(null);

  const [, setLng] = useState(5);
  const [, setLat] = useState(34);
  const [zoom, setZoom] = useState(props.zoom);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: props.center.center,
      zoom: zoom,
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    props.points.forEach((point) => {
      if (!point) {
        return;
      }
      new mapboxgl.Marker({
        draggable: false,
        color: point.color,
      })
        .setLngLat(point.center)
        .setPopup(
          new mapboxgl.Popup({ maxWidth: "100px" }).setHTML(
            `<div><img width="50" src="${getLogo(point.id)}" /><p>${
              point.text
            }</p></div>`
          )
        )
        .addTo(map);
    });

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []);

  return (
    <div className={`${props.className}`}>
      <MapContainer ref={mapContainerRef} />
    </div>
  );
};

export default Map;
