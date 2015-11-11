'use strict';

const Redis = require('ioredis');
const times = require('lodash.times');

const mailQueueKey = 'mailQueue';

if (process.argv.length < 3) {
  console.error('usage: node mail-client.js N_MSGS_TO_QUEUE');
  process.exit(1);
}

const redis = new Redis();
const rPipeline = redis.pipeline();
const nMsgsToQueue = process.argv[2];

function queueMsg(i) {
  const msg = {
    body: `my msg ${i}`
  };
  rPipeline.lpush(mailQueueKey, JSON.stringify(msg));
}

times(nMsgsToQueue, queueMsg);
rPipeline.exec((err, results) => {
  if (err) { return console.error(err); }
  console.log(`${nMsgsToQueue} messages queued`);
});

redis.quit();
