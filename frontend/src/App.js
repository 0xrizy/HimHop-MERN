import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useAsyncError } from "react-router-dom";
import Navbar from './Navbar';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Picks from './Components/Picks';
import Results from './Components/Results';
import YourPicks from './Components/YourPicks';
import './App.css'
import Details from './Components/Details';


const App = () => {
  const [isLoggedIn, setIsLoggedIn]= useState(false)
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const [detailName, setDetailName]= useState(null)

  return (
  <BrowserRouter>
  <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
    <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn}/>}/>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/picks" element={<Picks selectedPlaceId={selectedPlaceId} setSelectedPlaceId={setSelectedPlaceId}/>} />
        <Route path="/results/:placeId" element={<Results selectedPlaceId={selectedPlaceId} setSelectedPlaceId={setSelectedPlaceId} setDetailName={setDetailName}/>} />
        <Route path="/yourPicks" element={<YourPicks />} />
        <Route path="/results/api/:name1" element={<Details detailName={detailName} />} />
    </Routes>
  </BrowserRouter>
  );
};

export default App;
