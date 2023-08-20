'use strict';
console.log('Client side javascript file is loaded!');

// (async function () {
//   const res = await fetch('http://localhost:3000/weather?address=boston');
//   console.log(res);
//   const data = await res.json();
//   console.log(data);
//   if (data.error) return console.log(error);
//   console.log(`${data.location}`);
//   console.log(`${data.forcast}`);
// })();

const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  //   console.log('testing');

  const location = searchInput.value;

  if (!location)
    return (messageOne.textContent = 'Error: Please specify a location');

  messageOne.textContent = 'loading...';
  messageTwo.textContent = '';

  const res = await fetch(`http://localhost:3000/weather?address=${location}`);
  //   console.log(res);
  const data = await res.json();
  //   console.log(data);
  //if (data.error) return console.log(error);
  if (data.error) return (messageOne.textContent = `${data.error}`);
  //   console.log(`${data.location}`);
  //   console.log(`${data.forcast}`);
  messageOne.textContent = `${data.location}`;
  messageTwo.textContent = `${data.forcast}`;
});
