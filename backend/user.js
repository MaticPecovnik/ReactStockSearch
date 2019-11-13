// /backend/user.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
// Mongoose schema for a user document used for registration and login
const userSchema = new Schema({
  _id: Number,
  username: String,
  password: String,
  email: String
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("User", userSchema, "userInfo");
