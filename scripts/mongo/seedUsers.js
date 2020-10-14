// DEBUG=app:* node scripts/mongo/seedUsers.js

const chalk = require('chalk');
const debug = require('debug')('app:scripts:users')
const bcrypt = require('bcrypt');
const MongoLib = require('../../lib/mongo');
const { usersMock } = require('../../utils/mocks/usersMock');

async function createUser(mongodb, user) {
  const { name, email, password, isAdmin } = user;
  const hashedPassword = await bcrypt.hash(password, 10);

  const userId = await mongodb.create('users', {
    name,
    email,
    password: hashedPassword,
    isAdmin: Boolean(isAdmin),
  });

  return userId;
}

async function seedUsers() {
  try {
    const mongodb = new MongoLib();

    const promises = usersMock.map(async (user) => {
      const userId = await createUser(mongodb, user);
      debug(chalk.green(`User created with id:${userId}`));
    });

    await Promise.all(promises)
    return process.exit(0)
  } catch (error) {
    debug(chalk.red(error))
    return process.exit(1)
  }
}

seedUsers();
