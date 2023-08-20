'use strict';

import request from 'postman-request';
// const request = require('postman-request');

// const latitude = 4.53944;
// const longitude = 7.24715;

// const url = `http://api.weatherstack.com/current?access_key=1d087805c2d7c09a037b87ca88283106&query=${latitude},${longitude}`;

// request(
//   {
//     url,
//     json: true,
//   },
//   (error, response) => {
//     //   //   console.log(response);
//     //   const data = JSON.parse(response.body);
//     //   //   console.log(data);
//     //   console.log(data.current);
//     // console.log(response.body.current);
//     const data = response.body.current;
//     console.log(
//       `${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees out. There is a ${data.feelslike}% chance of rain`
//     );
//   }
// );

export default function (address, callback) {
  const url = `http://api.weatherstack.com/current?access_key=1d087805c2d7c09a037b87ca88283106&query=${address}&units=f`;

  request({ url, json: true }, (error, response) => {
    console.log(response);
    if (error)
      return callback('Unable to connect to weather service', undefined);

    const { body } = response;
    const errorMessage = body.error;

    if (errorMessage) return callback('Unable to find location', undefined);

    const { weather_descriptions, temperature, feelslike } = body.current;
    const { country } = body.location;

    const forcast = `${weather_descriptions[0]}. It is currently ${temperature} degrees out. There is a ${feelslike}% chance of rain`;

    // console.log(
    //   `${weather_descriptions[0]}. It is currently ${temperature} degrees out. There is a ${feelslike}% chance of rain`
    //   // console.log(data)
    // );

    if (body)
      return callback(undefined, {
        forcast,
        location: country,
      });
  });
}
