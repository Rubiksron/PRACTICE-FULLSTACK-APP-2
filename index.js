const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const db = mongoose.connection;
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/movies';

mongoose.connect(
  DATABASE_URL,
  { useNewUrlParser: true}
);

db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Database'));
app.use(express.json());


const movies = [
  {id: 1, movie: "Alice in Wonderland"},
  {id: 2, movie: "12 Monkeys"},
  {id: 3, movie: "Brazil"}
]

app.get('/movies/', (req, res) => {
  res.send(movies)
});

app.get('/api/movies/:id', (req, res) => {
  const movie = movies.find(function(m) {
    return m.id === parseInt(req.params.id)
  })
  if(!movie) {
    res.status(404).send('The movie id was not found')
  }
  res.send(movie)
})

app.post('/api/movies/', (req, res) => {
  if(!req.body.movie || req.body.movie.length < 3) {
    res.status(400).send('movie required and should be at least 3 characters long.')
  }
  const movie = {
    id: movies.length + 1,
    movie: req.body.movie
  }
  movies.push(movie);
  res.send(movies)
})

app.delete('/api/movies/:id', (req, res) => {
  const movie = movies.find(function(m) {
    return m.id === parseInt(req.params.id);
  })
  if(!movie) {
    res.status(404).send("The movie ID given was not found.")
  }
  const index = movies.indexOf(movie)
  movies.splice(index, 1);
  res.send(movie);
})

app.listen(PORT, console.log(`listening on PORT: ${PORT}`))
