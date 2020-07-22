const express = require('express');
const { moviesMock } = require('../utils/mocks/moviesMock');

function moviesApp(app) {
  const router = express.Router();
  app.use('/api/movies', router);

  router.get('/', async (req, res, next) => {
    try {
      const movies = await Promise.resolve(moviesMock);

      res.status(200).json({
        data: movies,
        message: 'movies listed',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:movieId', async (req, res, next) => {
    try {
      const movie = await Promise.resolve(moviesMock[0]);

      res.status(200).json({
        data: movie,
        message: 'movie retrieved',
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      const movieCreated = await Promise.resolve(moviesMock[0].id);

      res.status(201).json({
        data: movieCreated,
        message: 'movie created',
      });
    } catch (error) {
      next(error);
    }
  });

  router.put('/', async (req, res, next) => {
    try {
      const movieUpdate = await Promise.resolve(moviesMock[0].id);

      res.status(200).json({
        data: movieUpdate,
        message: 'movie updated',
      });
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:movieId', async (req, res, next) => {
    try {
      const movieUpdate = await Promise.resolve(moviesMock[0].id);

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
