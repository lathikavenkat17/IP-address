import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for marker icon not showing correctly in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = ({ ipAddress }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get(`https://ipapi.co/${ipAddress}/json/`);
        console.log('API Response:', response.data); // Log the response for debugging
        const { latitude, longitude } = response.data;
        if (latitude && longitude) {
          setLocation({ lat: latitude, lng: longitude });
        } else {
          setLocation(null);
        }
      } catch (error) {
        console.error('Error fetching location:', error);
        setLocation(null); // Ensure location is null in case of an error
      }
    };

    fetchLocation();
  }, [ipAddress]);

  if (!location) {
    return <div>Loading map...</div>;
  }

  return (
    <div className="map-container">
      <h2>Location Map</h2>
      <div className="leaflet-container">
        <MapContainer center={[location.lat, location.lng]} zoom={13} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[location.lat, location.lng]}>
            <Popup>
              Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default MapComponent;





