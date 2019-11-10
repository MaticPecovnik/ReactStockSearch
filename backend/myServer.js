var MongoClient = require("mongodb").MongoClient;
const express = require("express");

// create new express app and save it as "app"
const app = express();

// server configuration
const PORT = 27017;
var url = `mongodb://localhost:${PORT}/mydb`;

// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});
