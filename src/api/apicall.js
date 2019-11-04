// api-key: V81TVI2YMKQBW0IG

fetch("https://finboxstefan-skliarovv1.p.rapidapi.com/getBatchDataForMetric", {
	"method": "POST",
	"headers": {
		"x-rapidapi-host": "Finboxstefan-skliarovV1.p.rapidapi.com",
		"x-rapidapi-key": "19909a7114mshd2048d3a54edfadp18f939jsn54e086a42a39",
		"content-type": "application/x-www-form-urlencoded"
	},
	"body": {}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.log(err);
});