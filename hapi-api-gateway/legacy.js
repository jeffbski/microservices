'use strict';

const Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ host: 'localhost', port: 5000 });

server.route({
  method: 'GET',
  path: '/friends',
  handler: function (request, reply) {
    reply([
      'alice',
      'bob',
      'carol'
    ]);
  }
});

server.route({
  method: 'GET',
  path: '/recent',
  handler: function (request, reply) {
    reply([
      'update-a',
      'update-b',
      'update-c'
    ]);
  }
});

server.route({
  method: 'GET',
  path: '/prefs',
  handler: function (request, reply) {
    reply({
      pref1: true,
      pref2: 'blue',
      pref3: 100
    });
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
