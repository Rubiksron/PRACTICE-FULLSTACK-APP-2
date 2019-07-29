const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
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

app.listen(PORT, console.log(`listening on PORT: ${PORT}`))
