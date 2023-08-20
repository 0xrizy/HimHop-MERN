import React, { useEffect, useState } from 'react';
import './CSS/Results.css'
import { Link } from 'react-router-dom';

const Results = ({ selectedPlaceId, setDetailName }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const apiKey = '3083a33fae2d4706a877e19488365477';
        const response = await fetch(`https://api.geoapify.com/v2/places?categories=entertainment,tourism,leisure&filter=place:${selectedPlaceId}&limit=20&apiKey=${apiKey}`);
        const data = await response.json();
        setResults(data.features);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, [selectedPlaceId]);

  const saveToFavorites = async (result) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the user's token
      if (!token) {
        console.error("User token not found.");
        return;
      }

      const response = await fetch("https://himhop1.onrender.com/saveToFavorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(result),
      });

      const data = await response.json();
      if (data.status) {
        console.log("Result saved to favorites.");
      alert("Added to your favs list")
      } else {
        console.error("Error saving result to favorites.");
      }
    } catch (error) {
      console.error("Error saving result:", error);
    }
  };


  //////////////////////////////////////////////////////////////////////
  const handleClick=(name1)=>{
    setDetailName(name1)
  }

  return (
    <div>

<div className="main-container">
      <div className="results-container">
        <center>
        <h2 className="results-heading">Most Famous Places</h2>
        </center>
        <ul className="results-list">
        {isLoading ? (
          <div className="loader">Loading...</div>
        ) : (
          results.map((feature, index) => (
            <li key={index} className="result-card">
              <h3 className="result-name">{feature.properties.name}</h3>
              <p className="result-full-name">Full name: {feature.properties.formatted}</p>
              <p className="result-category"><b>Category</b>: {feature.properties.categories[0]}</p>
              <p className="result-address"><b>Address</b>: {feature.properties.address_line2}</p>
              <button onClick={() => saveToFavorites(feature.properties)}>
                Save to Fav
              </button>
              <Link to={`/results/api/${feature.properties.name}}`}>
              <button onClick={() => handleClick(feature.properties.name)}>View Details</button>    
              </Link>
              
            </li>
          ))
          )}
        </ul>
      </div>
    </div>
      </div>
  );
};

export default Results;
