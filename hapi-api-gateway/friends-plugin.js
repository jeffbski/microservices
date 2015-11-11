'use strict';

function register(server, options, next) {
    server.route({
      method: 'GET',
      path: '/friends',
      handler: function (request, reply) {
        reply([
          'Alice',
          'Bob',
          'Carol'
        ]).header('x-version', '2.0');
      }
    });

    next();
}

register.attributes = {
  name: 'friends',
  version: '1.0.0'
};

// or using package.json
// register.attributes = {
//   pkg: require('./package.json')
// };

module.exports = {
  register
};
