'use strict';

const Redis = require('ioredis');

const redis = new Redis();
const mailQueueKey = 'mailQueue';
const forever = 0;
let shuttingDown = false;

function waitForMail() {
  redis.brpop(mailQueueKey, forever, (err, result) => {
    if (err) {
      if (shuttingDown) return;
      console.error(err);
      return process.nextTick(waitForMail);
    }
    const val = result[1];
    console.log(val); // deliver email here
    process.nextTick(waitForMail);
  });
}

function shutdown() {
  shuttingDown = true;
  // use disconnect rather than quit since brpop blocks
  redis.disconnect();
}

process
  .once('SIGINT', shutdown)
  .once('SIGTERM', shutdown);

waitForMail();
