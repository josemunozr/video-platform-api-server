const MongoLib = require('../lib/mongo');

class MoviesService {
  constructor() {
    this.mongoDB = new MongoLib();
    this.collection = 'movies';
  }
  
  async getMovies({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const movies = await this.mongoDB.getAll(this.collection, query);
    return movies || [];
  }

  async getMovie({ movieId }) {
    const movie = await this.mongoDB.get(this.collection, movieId);
    return movie || {};
  }

  async createMovie({ movie }) {
    const createdMovideId = await this.mongoDB.create(this.collection, movie);
    return createdMovideId;
  }

  async updateMovie({ movieId, movie }) {
    const updatedMovieId = await this.mongoDB.update(
      this.collection,
      movieId,
      movie
    );
    return updatedMovieId;
  }

  async deleteMovie({ movieId }) {
    const deletedMovieId = await this.mongoDB.delete(this.collection, movieId);
    return deletedMovieId;
  }
}

module.exports = MoviesService;
