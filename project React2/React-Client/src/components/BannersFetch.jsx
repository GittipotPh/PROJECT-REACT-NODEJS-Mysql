/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BannerFetch() {
  const [bannersData, setBannersData] = useState([]);

  useEffect(() => {
    // Fetch banners data from MySQL table
    const fetchBannersData = async () => {
      try {
        const response = await axios.get('http://localhost:3004/banners');
        if (Array.isArray(response.data)) {
          setBannersData(response.data);
        } else {
          console.error('Invalid data format received from the server');
        }
      } catch (error) {
        console.error('Error fetching banners data:', error);
      }
    };

    fetchBannersData();
  }, []);

  return (
    <div>
      <div className="container mt-4">
        <h2 className="text-center">Banners</h2>
        <div className="row">
          {bannersData.map((banner, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={banner.img_brand_url}
                  alt={`Banner ${index + 1}`}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{banner.topic}</h5>
                  <p className="card-text">{banner.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BannerFetch; */
