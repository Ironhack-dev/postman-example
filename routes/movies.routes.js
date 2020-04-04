const express = require('express');
const Movie = require('../models/Movie');

const router = express.Router();

router.get('/', (req, res, next) => {
  Movie.find()
    .populate('creator')
    .populate({ path: 'comments', populate: { path: 'author' } })
    .then((movies) => {
      res.json(movies);
    })
    .catch(err => res.status(500).json(err))
});

router.post('/', (req, res, next) => {
  const newMovie = new Movie(req.body);
  newMovie.save()
    .then(movie => {
      res.json(movie);
    })
    .catch(err => res.status(500).json(err))
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Movie.findOne({ _id: id }).then((movie) => {
    res.json(movie);
  })
    .catch(err => res.status(500).json(err))
});

router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  Movie.findOneAndUpdate({ _id: id }, req.body, { new: true })
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  Movie.findOneAndRemove({ _id: id })
    .then(() => res.json({ message: 'Removed succesfully' }))
    .catch(err => res.status(500).json(err));
})

module.exports = router;
