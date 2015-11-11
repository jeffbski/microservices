'use strict';

const Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ host: 'localhost', port: 6000 });

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

server.start(() => {
  console.log(`running at ${server.info.uri}`);
});

function shutdown() {
  server.stop(() => console.log('shutdown successful'));
}

process
  .once('SIGINT', shutdown)
  .once('SIGTERM', shutdown);
