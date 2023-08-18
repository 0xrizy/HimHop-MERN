const express = require("express");
const mongoose= require("mongoose")
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const UserDB = require('./Models/UserModel')
const authMiddleware = require("./authMiddleware")


app.use(express.json());
app.use(cors());
const secretKey ="secr3t"
const URI = "mongodb+srv://rizulthakur:passwordofrizul@cluster1.t7bdju3.mongodb.net/himhop1?retryWrites=true&w=majority"

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