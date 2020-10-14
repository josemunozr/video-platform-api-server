// DEBUG=app:* node sripts/mongo/seedMovies.js

const chalk = require('chalk');
const debug = require('debug')('app:scripts:movies');
const MongoLib = require('../../lib/mongo');
const { moviesMock } = require('../../utils/mocks/moviesMock');

async function seedMovies() {
  try {
    const mongodb = new MongoLib();

    const promises = moviesMock.map(async (movie) => {
      await mongodb.create('movies', movie);
    });

    await Promise.all(promises);
    debug(chalk.green(`${promises.length} movies have been created succefully`))
    return process.exit(0)
  } catch (error) {
    debug(chalk.red(error))
    return process.exit(1)
  }
}

seedMovies();
