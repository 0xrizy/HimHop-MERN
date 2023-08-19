const express = require("express");
const mongoose= require("mongoose")
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const UserDB = require('./Models/UserModel')
const authMiddleware = require("./authMiddleware")
require('dotenv').config();
const mongoURI = process.env.MONGO_URI;

const secret = process.env.SECRET;
app.use(express.json());
app.use(cors());
const secretKey =secret
const URI = mongoURI

mongoose
  .connect(URI)
  .then(() => {
    app.listen(3001, () => {
      console.log(`Connected to DB & Server running on PORT 3001`);
    });
  })
  .catch((error) => {
    console.log(error);
  });


  //REGISTER

  app.post("/register", async (req, res) => {
    try {
      const { email, password, name } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({
          errorMessage: 'Email and password are required!',
          status: false
        });
      }
  
      const existingUser = await UserDB.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({
          errorMessage: `Email ${email} already exists!`,
          status: false
        });
      }
  
      const newUser = new UserDB({
        email,
        password,
        name
      });
  
      await newUser.save();
  
      const token = jwt.sign({ userId: newUser._id }, secretKey);
  
      res.status(200).json({
        status: true,
        title: 'Registered Successfully.',
        message: `User ${name} created Successfully`,
        token
      });
    } catch (err) {
      res.status(400).json({
        errorMessage: 'Something went wrong!',
        status: false
      });
    }
  });
  
  // LOGIN
  app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({
          errorMessage: 'Email and password are required!',
          status: false
        });
      }
  
      const user = await UserDB.findOne({ email });
  
      if (!user) {
        return res.status(404).json({
          errorMessage: 'User not found!',
          status: false
        });
      }
  
      if (user.password !== password) {
        return res.status(401).json({
          errorMessage: 'Incorrect password!',
          status: false
        });
      }
  
      const token = jwt.sign({ userId: user._id }, secretKey);
  
      res.status(200).json({
        status: true,
        message: 'Login successful!',
        userData: {
          email: user.email,
        },
        token
      });
    } catch (err) {
      res.status(400).json({
        errorMessage: 'Something went wrong!',
        status: false
      });
    }
  });
  
  app.post("/saveToFavorites", authMiddleware, async (req, res) => {
    try {
      const name = req.body.name;
      const address = req.body.address_line2
      console.log(req.body);
      console.log(name);
      console.log(address);
      const userId = req.user; // User ID from authMiddleware
  
      const user = await UserDB.findById(userId);
      if (!user) {
        return res.status(404).json({ errorMessage: "User not found" });
      }
  
      user.favorites.push({ name, address });
      await user.save();
  
      res.json({ status: true, message: "Favorite saved successfully" });
    } catch (error) {
      console.error("Error saving favorite:", error);
      res.status(500).json({ errorMessage: "Internal server error" });
    }
  });



  app.get("/yourPicks", authMiddleware, async (req, res) => {
    try {
      const userId = req.user; // User ID from authMiddleware
      const user = await UserDB.findById(userId);
  
      if (!user) {
        return res.status(404).json({ errorMessage: "User not found" });
      }
  
      res.json({ picks: user.favorites });
    } catch (error) {
      console.error("Error fetching picks:", error);
      res.status(500).json({ errorMessage: "Internal server error" });
    }
  });


  app.get('/get-image', async (req, res) => {
    try {
      const detailName = req.query.detailName;
      const apiKey = "ad6d9183e75dcd34708f49e0640bca70504109a19a488a7e850ab3ba76bd8107";
      const response = await fetch(`https://serpapi.com/search.json?engine=google_images&q=${detailName}&location=Himachal+Pradesh,+India&hl=hi&gl=in&api_key=${apiKey}`);
      console.log(response);
      const data = await response.json();
      console.log(data);
      console.log(data.images_results[0].thumbnail);
      if (data.images_results && data.images_results.length > 0) {
        const imageUrl = data.images_results[0].thumbnail;
        res.json({ imageUrl });
      } else {
        res.status(404).json({ error: 'Image not found' });
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });