const express = require('express');
const UserMoviesService = require('../services/userMovies');
const validateHandler = require('../utils/middlewares/validationHandler');

const { userIdSchema } = require('../utils/schemas/user');
const {
  createUserMovieSchema,
  userMovieIdSchema,
} = require('../utils/schemas/userMovies');

function userMoviesApi(app) {
  const router = express.Router();
  app.use('/api/user-movies', router);

  const userMoviesService = new UserMoviesService();

  app.get(
    '/',
    validateHandler({ userId: userIdSchema }, 'query'),
    async (req, res, next) => {
      const { userId } = req.query;
      try {
        const userMovies = await userMoviesService.getUserMovies({ userId });
        res.status(200).json({
          data: userMovies,
          message: 'user movies listened',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  app.post(
    '/',
    validateHandler(createUserMovieSchema),
    async (req, res, next) => {
      const { body: userMovie } = req;
      try {
        const userMovieIdCreated = await userMoviesService.createUserMovie({
          userMovie,
        });
        res.status(201).json({
          data: userMovieIdCreated,
          message: 'user movie created',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  app.delete(
    '/:userMovieId',
    validateHandler({ userMovieId: userMovieIdSchema }, 'params'),
    async (req, res, next) => {
      const { userMovieId } = req.params;
      try {
        const deleteUserMovieId = await userMoviesService.deleteUserMovie({
          userMovieId,
        });
        res.status(200).json({
          data: deleteUserMovieId,
          message: 'user movie deleted',
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = userMoviesApi;
