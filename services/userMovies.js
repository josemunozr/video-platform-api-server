const MongoLib = require('../lib/mongo');

class UserMoviesService {
  constructor() {
    this.mongoDB = new MongoLib();
    this.collection = 'user-movies';
  }

  async getUserMovies({ userId }) {
    const query = userId && { userId };
    const userMovies = this.mongoDB.getAll(this.collection, query);
    return userMovies;
  }

  async createUserMovie({ userMovie }) {
    const createdUserMovieId = this.mongoDB.create(this.collection, userMovie);
    return createdUserMovieId;
  }

  async deleteUserMovie({ userMovieId }) {
    const deletedUserMovieId = this.mongoDB.delete(
      this.collection,
      userMovieId
    );
    return deletedUserMovieId;
  }
}

module.exports = UserMoviesService;
