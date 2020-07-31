const boom = require('@hapi/boom');

function validate() {
  return false;
}

function validateHandler(schema, check = 'body') {
  return (req, res, next) => {
    const error = validate(req[check], schema);

    error ? next(boom.badRequest(error)) : next();
  };
}

module.exports = validateHandler;
