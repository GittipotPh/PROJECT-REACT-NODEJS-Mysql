import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GoogleMapComponent from './APIgoogle';

function Samsaung() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    // Fetch banners using Axios
    axios.get('http://localhost:3004/banners')
      .then(response => setBanners(response.data))
      .catch(error => console.error('Error fetching banners:', error));
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start' }}>
        {banners.map(banner => (
          <div key={banner.id} style={{ margin: '20px', padding: '20px', border: '5px solid #ccc', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={banner.img_brand_url} alt={banner.topic} style={{ width: '500px', height: '450px', marginBottom: '10px' }} />
            <img src={banner.img_promotion_url} alt={banner.topic} style={{ width: '500px', height: '450px', marginBottom: '10px' }} />
            <h3 style={{ fontSize: '24px', marginBottom: '10px', fontWeight: 'bold' }}>{banner.topic}</h3>
            <p style={{ fontSize: '18px', color: '#555', textAlign: 'center' }}>{banner.content}</p>
          </div>
        ))}
      </div>

      <GoogleMapComponent style={{ marginTop: '20px', marginBottom: '20px', width: '100%', height: '400px' }} />
    </div>
  );
}

export default Samsaung;
