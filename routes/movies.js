const express = require('express');
const MoviesServices = require('../services/movies');

const {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema,
} = require('../utils/schemas/movie');

const validationHandler = require('../utils/middlewares/validationHandler');
const buildMessage = require('../utils/buildMessage');
const cacheResponse = require('../utils/cacheResponse');

const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS,
} = require('../utils/times');

function moviesApp(app) {
  const router = express.Router();
  app.use('/api/movies', router);
  const moviesServices = new MoviesServices();

  router.get('/', async (req, res, next) => {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
    const { tags } = req.query;
    try {
      const movies = await moviesServices.getMovies({ tags });

      res.status(200).json({
        data: movies,
        message: buildMessage('movie', 'list'),
      });
    } catch (error) {
      next(error);
    }
  });

  router.get(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    async (req, res, next) => {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);

      const { movieId } = req.params;
      try {
        const movie = await moviesServices.getMovie({ movieId });

        res.status(200).json({
          data: movie,
          message: buildMessage('movie', 'retrieve'),
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/',
    validationHandler(createMovieSchema),
    async (req, res, next) => {
      const { body: movie } = req;
      try {
        const movieIdCreated = await moviesServices.createMovie({ movie });

        res.status(201).json({
          data: movieIdCreated,
          message: buildMessage('movie', 'create'),
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    validationHandler(updateMovieSchema),
    async (req, res, next) => {
      const { body: movie } = req;
      const { movieId } = req.params;
      try {
        const movieUpdate = await moviesServices.updateMovie({
          movie,
          movieId,
        });

        res.status(200).json({
          data: movieUpdate,
          message: buildMessage('movie', 'update'),
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    async (req, res, next) => {
      const { movieId } = req.params;
      try {
        const movieDeleted = await moviesServices.deleteMovie({ movieId });

        res.status(200).json({
          data: movieDeleted,
          message: buildMessage('movie', 'delete'),
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = moviesApp;
