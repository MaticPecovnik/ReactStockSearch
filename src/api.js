// Alpha vantage API key = V81TVI2YMKQBW0IG

const axios = require("axios");

axios(
  "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo"
)
  .then(response => {
    console.log(Object.keys(response.data["Time Series (Daily)"]));
  })
  .catch(error => {
    console.log(error);
  });
