const assert = require('assert');
const buildMessage = require('../utils/buildMessage');

describe('utils - buildMessage', () => {
  describe('when receives an entity and a action', () => {
    it('should return then respective message', () => {
      const result = buildMessage('movie', 'create');
      const expected = 'movie created';
      assert.strictEqual(result, expected);
    });
  });
  
  describe('when receives an entity and action and is a list', () => {
    it('should return then respective message with the entity in plural', () => {
      const result = buildMessage('movie', 'list');
      const expected = 'movies listed';
      assert.strictEqual(result, expected);
    });
  });

});
