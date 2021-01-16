
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

import { Segment } from 'semantic-ui-react';

import keys from '../../util/keys.json';
import './Map.css';

mapboxgl.accessToken = keys["mapbox-API"];

const Map = (props) => {
  const mapContainerRef = useRef(null);

  const [, setLng] = useState(5);
  const [, setLat] = useState(34);
  const [zoom, setZoom] = useState(10);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: props.center,
      zoom: zoom
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    var marker = new mapboxgl.Marker({
      draggable: false
      }).setLngLat(props.center)
      .addTo(map);

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Segment>
      <div className='mapContainer' ref={mapContainerRef} />
    </Segment>
  );
};

export default Map;