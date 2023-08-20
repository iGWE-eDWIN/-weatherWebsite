'use strict';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs';
import forcast from './utils/forcast.js';

const app = express();

// Derfine paths for express config
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

// setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')));

// app.get('', (req, res) => {
//   res.send('<h1>Weather</h1>');
// });

// app.get('/help', (req, res) => {
//   res.send({
//     name: 'Edwin',
//     age: 27,
//   });
// });

// app.get('/about', (req, res) => {
//   res.send('<h1>About</h1>');
// });

app.get('', (req, res) => {
  res.render('index.hbs', {
    title: 'Weather App',
    name: 'iGWE_eDWIN',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About robot',
    name: 'Edwin',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: `If you're having issues using our site please call +234-805-55-6754`,
    title: 'Help',
    name: 'Edwin',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address)
    return res.send({ errorMessage: 'Address must be provided' });

  forcast(req.query.address, (error, data = {}) => {
    if (error) return res.send({ error });

    const { forcast, location } = data;
    res.send({
      forcast,
      location,
      address: req.query.address,
    });
  });
});

app.get('/product', (req, res) => {
  if (!req.query.search)
    return res.send({ error: 'You must provide a search term' });

  console.log(req.query);
  res.send({ product: [] });
});

app.get('/help/*', (req, res) => {
  res.render('error', {
    errorMessage: 'Help article not found',
    name: 'Edwin',
    title: '404',
  });
});

app.get('*', (req, res) => {
  res.render('error', {
    errorMessage: 'Page not found',
    name: 'Edwin',
    title: '404',
  });
});

app.listen(3000, () => {
  console.log('Server up at port 3000');
});
