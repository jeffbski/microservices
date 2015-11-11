'use strict';

const friends = require('./friends-plugin');
const Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ host: 'localhost', port: 6000 });

server.register({ register: friends }, err => {
  if (err) { return console.error(err); }

  server.start(() => {
    console.log(`running at ${server.info.uri}`);
  });
});

function shutdown() {
  server.stop(() => console.log('shutdown successful'));
}

process
  .once('SIGINT', shutdown)
  .once('SIGTERM', shutdown);
