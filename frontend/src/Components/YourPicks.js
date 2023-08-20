import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CSS/YourPicks.css'

const YourPicks = () => {
  const [picks, setPicks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the user's token
        console.log(token);
        if (!token) {
          console.error("User token not found.");
          return;
        }

        const response = await axios.get("https://himhop1.onrender.com/yourPicks", {
          headers: {
            Authorization: token,
          },
        });

        setPicks(response.data.picks);
        console.log("donescene");
      } catch (error) {
        console.error('Error fetching picks:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className='hd'>Your Picks</h2>
      <div className="background-image"></div>
      <div className="picks-container">
        {picks.map((pick, index) => (
          <div key={index} className="pick-card">
            <h3 className="pick-name">{pick.name}</h3>
            <p className="pick-address">Address: {pick.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourPicks;
