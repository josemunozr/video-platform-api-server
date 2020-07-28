const express = require('express');
const app = express();

const { config } = require('./config/index');
const moviesApp = require('./router/movies');

app.use(express.json());
moviesApp(app);

app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`);
});
