'use strict';

const Boom = require('boom');
const Hapi = require('hapi');
const H2O2 = require('h2o2');

const proxyMap = {
  '/friends': 'http://localhost:5000/friends',
  '/recent': 'http://localhost:5000/recent',
  '/prefs': 'http://localhost:5000/prefs'
};

var server = new Hapi.Server();

server.register([
  { register: H2O2 }
], err => {
  if (err) { return console.error(err); }

  server.connection({ host: 'localhost', port: 7000 });

  const proxyHandler = {
    proxy: {
      mapUri: (req, cb) => {
        const uri = proxyMap[req.path];
        if (!uri) { return cb(Boom.notFound()); }
        cb(null, uri, req.headers);
      },
      onResponse: (err, res, req, reply, settings, ttl) => {
        if (err) { return reply(err); }
        reply(res);
      }
    }
  };

  server.route([
    { method: 'GET', path: '/friends', handler: proxyHandler },
    { method: 'GET', path: '/recent', handler: proxyHandler },
    { method: 'GET', path: '/prefs', handler: proxyHandler }
  ]);

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
