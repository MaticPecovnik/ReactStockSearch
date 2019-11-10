const fetch = require("node-fetch");

const getDataFromDb = () => {
  fetch("http://localhost:3000/api/getData")
    .then(data => data.json())
    .then(res => console.log(res));
};

getDataFromDb();
