import React, { useEffect, useState } from 'react';
import './CSS/Results.css'

const Results = ({ selectedPlaceId }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const apiKey = '3083a33fae2d4706a877e19488365477';
        const response = await fetch(`https://api.geoapify.com/v2/places?categories=entertainment,tourism,leisure&filter=place:${selectedPlaceId}&limit=20&apiKey=${apiKey}`);
        const data = await response.json();
        setResults(data.features);
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

      const response = await fetch("http://localhost:3001/saveToFavorites", {
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

  return (
    <div className="results-container">
<div className="background-image"></div>
    <h2 className="results-heading">Most Famous Places</h2>
    <ul className="results-list">
      {results.map((feature, index) => (
        <li key={index} className="result-card">
          <h3 className="result-name">{feature.properties.name}</h3>
          <p className="result-full-name">Full name: {feature.properties.formatted}</p>
          <p className="result-category"><b>Category</b>: {feature.properties.categories[0]}</p>
          <p className="result-address"><b>Address</b>: {feature.properties.address_line2}</p>
          <button onClick={() => saveToFavorites(feature.properties)}>
              Save to Fav
            </button>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default Results;
