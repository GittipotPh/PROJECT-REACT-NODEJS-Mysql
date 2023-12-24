import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = { width: '40&%', height: '200px' };

const GoogleMapComponent = () => {
  const [shops, setShops] = useState([]);
  const [averageLat, setAverageLat] = useState(0);
  const [averageLng, setAverageLng] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3004/shops')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setShops(data);

        // Calculate the average latitude and longitude of all shops
        const avgLat = data.reduce((sum, shop) => sum + shop.lat, 0) / data.length;
        const avgLng = data.reduce((sum, shop) => sum + shop.lng, 0) / data.length;

        setAverageLat(isNaN(avgLat) ? 0 : avgLat);
        setAverageLng(isNaN(avgLng) ? 0 : avgLng);

        console.log('Shops data:', data);
        console.log('Average Lat:', avgLat);
        console.log('Average Lng:', avgLng);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Set the center to the average coordinates
  const center = {
    lat: averageLat,
    lng: averageLng,
  };

  console.log('Center:', center);

  return (
    <LoadScript googleMapsApiKey="AIzaSyAjKkYqxRTixO9xOe3R6UIULNMQyU7sUGo">
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={6}>
        {shops.map(shop => (
          <Marker
            key={shop.id}
            position={{ lat: shop.lat, lng: shop.lng }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
