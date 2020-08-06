const assert = require('assert');
const proxyquire = require('proxyquire');

const {
  MongoLibMock,
  getAllStub,
  getStub,
  createStub,
} = require('../utils/mocks/mongoLib');
const { moviesMock } = require('../utils/mocks/moviesMock');

describe('services - movies', () => {
  const moviesServicesMock = proxyquire('../services/movies', {
    '../lib/mongo': MongoLibMock,
  });

  const movieService = new moviesServicesMock();

  describe('when getMovies method is called', async () => {
    it('should call the getAll MongoLib method', async () => {
      await movieService.getMovies({});
      assert.strictEqual(getAllStub.called, true);
    });

    it('should return an array of movies', async () => {
      const result = await movieService.getMovies({});
      const expected = moviesMock;
      assert.deepEqual(result, expected);
    });

    it('should return an object of movie filtered', async () => {
      const result = await movieService.getMovies({ tags: 'Terror' });
      const expected = new Array(moviesMock[0]);
      assert.deepEqual(result, expected);
    });
  });

  describe('when getMovie method is called', async () => {
    it('should call the get MongoLib method', async () => {
      await movieService.getMovie({});
      assert.strictEqual(getStub.called, true);
    });

    it('should return requested movie', async () => {
      const mocksMovieId = 'd2a4a062-d256-41bb-b1b2-9d915af6b75e';
      const result = await movieService.getMovie({ movieId: mocksMovieId });
      const expect = moviesMock[0];
      assert.deepEqual(result, expect);
    });
  });

  describe('when createMovie method is called', async () => {
    it('should call get create MontoLib method', async () => {
      await movieService.createMovie({});
      assert.strictEqual(createStub.called, true);
    });

    it('shuld return an id of movie created', async () => {
      const resultId = await movieService.createMovie({});
      const expected = moviesMock[0].id;
      assert.equal(resultId, expected);
    });
  });
});
