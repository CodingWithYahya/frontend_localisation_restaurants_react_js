import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

const Map = ({ longitude, latitude }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Créer la carte avec les coordonnées de longitude et latitude
    mapRef.current = L.map('map', {
      center: [latitude, longitude],
      zoom: 13,
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
        }),
      ],
    });

    // Ajouter un marqueur pour le restaurant
    L.marker([latitude, longitude]).addTo(mapRef.current);
  }, [longitude, latitude]);

  return <div id="map" style={{ height: '400px' }} />;
};

export default Map;
