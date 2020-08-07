const assert = require('assert');
const proxyquire = require('proxyquire');

const { moviesMock, MoviesServicesMosk } = require('../utils/mocks/moviesMock');
const testServer = require('../utils/testServer');

describe('routes - movies', () => {
  const route = proxyquire('../routes/movies', {
    '../services/movies': MoviesServicesMosk,
  });

  const request = testServer(route);
  describe('GET /movies', () => {
    it('should response with status 200', (done) => {
      request.get('/api/movies').expect(200, done);
    });

    it('should response the list of movies', (done) => {
      request.get('/api/movies').end((erro, res) => {
        assert.deepEqual(res.body, {
          data: moviesMock,
          message: 'movies listed',
        });
        done();
      });
    });
  });
});
