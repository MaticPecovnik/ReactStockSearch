// api-key: 8xagjwFWGm8ECPnD337d

const fetch = require("node-fetch");

async function getStockTimeSeries(stockCode) {
  fetch(`https://quandl1.p.rapidapi.com/datasets/WIKI/${stockCode}.json`, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "quandl1.p.rapidapi.com",
      "x-rapidapi-key": "19909a7114mshd2048d3a54edfadp18f939jsn54e086a42a39"
    }
  })
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    });
}

console.log(getStockTimeSeries("FB"));
