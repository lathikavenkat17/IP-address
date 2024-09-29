import React, { useState } from 'react';
import axios from 'axios';
import MapComponent from './MapComponent';

const IPTracker = () => {
  const [ip, setIP] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setIP(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://ipapi.co/${ip}/json/`);
      console.log('API Response:', response.data); // Log the response
      setData(response.data);
      setError(null);
    } catch (err) {
      setError('Unable to fetch data. Please check the IP address.');
      setData(null);
    }
  };

  return (
    <div className="container mt-5">
      <h1>IP Address Tracker</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter IP address"
          value={ip}
          onChange={handleChange}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {data && (
        <div>
          <h2>IP Information</h2>
          <p><strong>IP:</strong> {data.ip}</p>
          <p><strong>City:</strong> {data.city}</p>
          <p><strong>Region:</strong> {data.region}</p>
          <p><strong>Country:</strong> {data.country_name}</p>
          <p><strong>ISP:</strong> {data.org}</p>
          <MapComponent ipAddress={data.ip} />
        </div>
      )}
    </div>
  );
};

export default IPTracker;




