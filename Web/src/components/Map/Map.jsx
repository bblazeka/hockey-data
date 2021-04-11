
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

import keys from '../../util/keys.json';
import './Map.scss';
import { getLogo } from '../../util/assets';

mapboxgl.accessToken = keys["mapbox-API"];

const Map = (props) => {
  const mapContainerRef = useRef(null);

  const [, setLng] = useState(5);
  const [, setLat] = useState(34);
  const [zoom, setZoom] = useState(props.zoom);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: props.center.center,
      zoom: zoom
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    props.points.forEach((point) => {
      new mapboxgl.Marker({
        draggable: false,
        color: point.color
      }).setLngLat(point.center)
        .setPopup(new mapboxgl.Popup({maxWidth: "100px"}).setHTML(`<div><img src="${getLogo(point.id)}" /><p>${point.text}</p></div>`))
        .addTo(map);
    });


    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []);

  return (
    <div className={`${props.className}`}>
      <div className='mapContainer' ref={mapContainerRef} />
    </div>
  );
};

export default Map;