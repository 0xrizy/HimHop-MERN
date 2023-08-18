const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  favorites: [{
      name:{
        type: String,
      },
      address:{ 
        type: String,
      }
    }]
});

module.exports = mongoose.model("User", userSchema);
