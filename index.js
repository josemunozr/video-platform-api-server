const express = require('express');
const moviesApp = require('./router/movies');
const app = express();

const { config } = require('./config/index');

moviesApp(app);

app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`)
});
