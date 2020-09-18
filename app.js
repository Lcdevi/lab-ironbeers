const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');


const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views/partials'));


// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    res.render('beers', {beersFromApi});
  //  console.log('Beers from the database: ', beersFromApi)
})
  .catch(error => console.log(error));
  
});

app.get('/random-beers', (req, res) => {
  punkAPI
  .getRandom()
  .then(randomFromAPI => {
    res.render('ranbeers', {randomFromAPI});
    console.log('Beers from the database: ', randomFromAPI)
  })
  .catch(error => console.log(error)); 
});

app.get("/beers/:id", (req, res) => {
  punkApi
  .getBeer(req.params.id)
  .then(beerId => {
    res.render('beerId', {beerId});
    console.log('Beer ID: ', beerId)
  })
  .catch(error => console.log(error)); 
});

app.listen(4000, () => console.log('🏃‍ on port http://localhost:4000'));
