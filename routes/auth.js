const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const ApiKeysService = require('../services/apiKeys');
const UsersService = require('../services/users');
const validationHandler = require('../utils/middlewares/validationHandler');
const { createUserSchema } = require('../utils/schemas/user')
const { config } = require('../config');

//Basic Strategy
require('../utils/auth/strategies/basic');

function authApi(app) {
  const router = express.Router();
  app.use('/api/auth', router);

  const apiKeysService = new ApiKeysService();
  const usersService = new UsersService();

  router.post('/sign-in', async (req, res, next) => {
    const { apiKeyToken } = req.body;

    if (!apiKeyToken) next(boom.unauthorized('ApiKeyToken is required'));

    passport.authenticate('basic', async (error, user) => {
      try {
        if (error || !user) next(error);

        req.login(user, { session: false }, async (error) => {
          if (error) next(error);

          const apiKey = await apiKeysService.getApiKeys({
            token: apiKeyToken,
          });

          if (!apiKey) next(boom.unauthorized());

          const { _id: id, name, email } = user;

          const payload = {
            sub: id,
            name,
            email,
            scopes: apiKey.scopes,
          };

          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: '5m',
          });

          return res.status(200).json({ token, user: { id, name, email } });
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  router.post('/sign-up', validationHandler(createUserSchema) , async (req, res, next) => {
    const { body: user} = req;
    try {
      const userCreatedId = await usersService.createUser({user})

      return res.status(201).json({
        data: userCreatedId,
        message: 'user created'
      })
    } catch (error) {
      next(error)
    }
  });
}

module.exports = authApi;
