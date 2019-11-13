// /backend/user.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
// The action schema can be used to append user transactions
// to track their portfolio movement

const actionSchema = new Schema({
  _id: Number,
  userId: Number,
  actions: [[]]
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Action", actionSchema, "stockAction");
