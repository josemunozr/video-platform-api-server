const assert = require('assert');
const proxyquire = require('proxyquire');

const {
  MongoLibMock,
  getAllStub,
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
  });

  describe('wheb createMovie method is called', async () => {
    it('should call get create MontoLib method', async () => {
      await movieService.createMovie({});
      assert.strictEqual(createStub.called, true);
    });

    it('shuld return an id of movie created', async () => {
      const resultId = await movieService.getMovie({});
      const expected = moviesMock[0].id;
      assert.equal(resultId, expected);
    });
  });
});
