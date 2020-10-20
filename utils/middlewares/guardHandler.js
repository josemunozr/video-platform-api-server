//JWT Strategy
require('../auth/strategies/jwt');
const passport = require('passport');
const boom = require('@hapi/boom');

const guardHandler = (req, res, next) => {
  passport.authenticate('jwt', async (error, user) => {
    if (error || !user) next(boom.unauthorized());

    req.login(user, { session: false }, (error) => {
      if (error) next(error);
      next();
    });
  })(req, res, next);
};

module.exports = guardHandler;
