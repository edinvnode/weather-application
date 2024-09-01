const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log('The server has started at port 3000.');
});

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html');
});

app.post('/', (request, response) => {
  let cityName = request.body.cityname;
  const APIKEY = 'de3570bab15bccc2705894e92ad7fd3a';
  //const URL =   'https://api.openweathermap.org/geo/1.0/direct?q=London&limit=1&appid=' + APIKEY;

  const URL =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    cityName +
    '&appid=' +
    APIKEY +
    '&units=metric';

  https.get(URL, (res) => {
    res.on('data', (data) => {
      let weatherInfo = JSON.parse(data);
      let weather = weatherInfo.weather[0].main;
      let temperature = weatherInfo.main.temp;
      let place = weatherInfo.name;
      let icon = weatherInfo.weather[0].icon;
      let imageUrl = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';

      response.write(
        '<h1>The weather in ' + place + ' is like ' + weather + '</h1>'
      );
      response.write(
        'The temparature in ' +
          place +
          ' is: ' +
          temperature +
          ' degrees Celsoius <br>'
      );
      response.write('<img src=' + imageUrl + ' />');

      response.send();
    });
  });
});
