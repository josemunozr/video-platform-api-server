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
      request.get('/api/movies').end((err, res) => {
        assert.deepEqual(res.body, {
          data: moviesMock,
          message: 'movies listed',
        });
        done();
      });
    });

    it('should response requested movie', (done) => {
      const movieIdMock = '5f240efcf373ccfcf8ec4750';
      request.get(`/api/movies/${movieIdMock}`).end((err, res) => {
        assert.deepEqual(res.body, {
          data: moviesMock[1],
          message: 'movie retrieved',
        });
        done();
      });
    });

  });

  describe('POST /movies', () => {
    it('should reponse with status 201', (done) => {
      request.post('/api/movies').expect(201, done);
    });

    it('should response with movie id created', (done) => {
      request
        .post('/api/movies')
        .send(moviesMock[1])
        .end((err, res) => {
          assert.deepEqual(res.body, {
            data: moviesMock[1].id,
            message: 'movie created',
          });
          done();
        });
    });
  });

  describe('PUT /movies', () => {
    const movieIdMock = '5f240efcf373ccfcf8ec4750';
    it('should reponse with status 200', (done) => {
      request.put(`/api/movies/${movieIdMock}`).expect(200, done);
    });

    it('should response with movie updated', (done) => {
      request
        .put(`/api/movies/${movieIdMock}`)
        .send(moviesMock[1])
        .end((err, res) => {
          assert.deepEqual(res.body, {
            data: moviesMock[1],
            message: 'movie updated',
          });
          done();
        });
    });
  });

  describe('DELETE /movies', () => {
    const movieIdMock = '5f240efcf373ccfcf8ec4750';
    it('should reponse with status 200', (done) => {
      request.delete(`/api/movies/${movieIdMock}`).expect(200, done);
    });

    it('should response with movie updated', (done) => {
      request
        .delete(`/api/movies/${movieIdMock}`)
        .send(moviesMock[1])
        .end((err, res) => {
          assert.deepEqual(res.body, {
            data: moviesMock[1],
            message: 'movie deleted',
          });
          done();
        });
    });
  });
});
