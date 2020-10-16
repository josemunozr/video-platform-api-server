const MongoLib = require('../lib/mongo');

class ApiKeysService {
  constructor() {
    this.collection = 'api-keys';
    this.mongoLib = new MongoLib();
  }

  async getApiKeys({ token }) {
    const [ apikey ] = await this.mongoLib.getAll(this.collection, { token });
    return apikey;
  }
}

module.exports = ApiKeysService;
