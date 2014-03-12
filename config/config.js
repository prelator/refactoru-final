var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'localdrones'
    },
    port: 3000,
    db: 'mongodb://localhost/localdrones-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'localdrones'
    },
    port: 3000,
    db: 'mongodb://localhost/localdrones-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'localdrones'
    },
    port: 3000,
    db: 'mongodb://localhost/localdrones-production'
  }
};

module.exports = config[env];
