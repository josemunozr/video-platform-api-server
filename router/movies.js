const express = require('express');
const MoviesServices = require('../services/movies');

function moviesApp(app) {
  const router = express.Router();
  app.use('/api/movies', router);
  const moviesServices = new MoviesServices();

  router.get('/', async (req, res, next) => {
    const { tags } = req.query;
    try {
      const movies = await moviesServices.getMovies({ tags });

      res.status(200).json({
        data: movies,
        message: 'movies listed',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:movieId', async (req, res, next) => {
    const { movieId } = req.params;
    try {
      const movie = await moviesServices.getMovie({ movieId });

      res.status(200).json({
        data: movie,
        message: 'movie retrieved',
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (req, res, next) => {
    const { body: movie } = req;
    try {
      const movieCreated = await moviesServices.createMovie({ movie });

      res.status(201).json({
        data: movieCreated,
        message: 'movie created',
      });
    } catch (error) {
      next(error);
    }
  });

  router.put('/:movieId', async (req, res, next) => {
    const { body: movie } = req;
    const { movieId } = req.params;
    try {
      const movieUpdate = await moviesServices.updateMovie({movie, movieId});

      res.status(200).json({
        data: movieUpdate,
        message: 'movie updated',
      });
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:movieId', async (req, res, next) => {
    const { movieId } = req.params;
    try {
      const movieUpdate = await moviesServices.deleteMovie({ movieId });

      res.status(200).json({
        data: movieUpdate,
        message: 'movie deleted',
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = moviesApp;
