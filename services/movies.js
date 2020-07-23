const { moviesMock } = require('../utils/mocks/moviesMock');
class MoviesService {
  async getMovies({ tags }) {
    const movies = await Promise.resolve(moviesMock);
    return movies || [];
  }

  async getMovie({ movieId }) {
    const movie = await Promise.resolve(moviesMock[0]);
    return movie || {};
  }

  async createMovie({ movie }) {
    const createdMovideId = await Promise.resolve(moviesMock[0].id);
    return createdMovideId;
  }

  async updateMovie({ movie, movieId }) {
    const updatedMovieId = await Promise.resolve(moviesMock[0].id);
    return updatedMovieId;
  }

  async deleteMovie({ movieId }) {
    const deletedMovieId = await Promise.resolve(moviesMock[0].id);
    return deletedMovieId;
  }
}

module.exports = MoviesService;
