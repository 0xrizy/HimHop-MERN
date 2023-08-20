import React, { useState, useEffect } from 'react';
import './CSS/Details.css'

function Details({ detailName }) {
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`https://himhop1.onrender.com/get-image?detailName=${detailName}`);
        const data = await response.json();
        console.log(response);
        console.log("data below");
        console.log(data);
        setImageUrl(data.imageUrl);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, [detailName]);

  return (
    <center>

    <div className="details-container">
    <h2 className="details-heading">{detailName}</h2>
    <div className="image-container">
    {isLoading ? (
          <div className="loader">Loading...</div>
        ) : (
          imageUrl && <img className="image" src={imageUrl} alt={detailName} />
        )}
    </div>
  </div>
    </center>
  );
}

export default Details;
