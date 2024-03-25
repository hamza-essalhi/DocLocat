import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const Map = ({ address }) => {
  const [map, setMap] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [addressNotFound, setAddressNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            address
          )}`
        );

        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            const { lat, lon } = data[0];
            setCoordinates({ lat, lon });
            setAddressNotFound(false); // Reset address not found
          } else {
            setCoordinates(null);
            setAddressNotFound(true); // Address not found
            console.log('Address not found');
          }
        } else {
          setCoordinates(null);
          setAddressNotFound(true); // Address not found
          console.error('Error fetching coordinates:', response.statusText);
        }
      } catch (error) {
        setCoordinates(null);
        setAddressNotFound(true); // Address not found
        console.error('Error fetching coordinates:', error);
      }
    };

    if (address) {
      fetchData();
    }
  }, [address]);

  const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
  });

  const handleMapReady = (map) => {
    setMap(map);
  };

  useEffect(() => {
    if (coordinates && map) {
      setTimeout(() => {
        map.setView([coordinates.lat, coordinates.lon], 12, { animate: true });
      }, 1000);
    }
  }, [coordinates, map]);

  if (addressNotFound) {
    return <div className='flex justify-center items-center'><h1>This Address Not Found </h1></div>;
  }

  if (!coordinates) {
    return null; // Do not render the map until coordinates are fetched
  }

  return (
    <MapContainer
      center={[coordinates.lat, coordinates.lon]}
      zoom={14}
      style={{ height: '500px', width: '90%' }}
      whenCreated={handleMapReady}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[coordinates.lat, coordinates.lon]} icon={customIcon}>
        <Popup>{address}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
