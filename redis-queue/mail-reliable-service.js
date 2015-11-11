'use strict';

const Redis = require('ioredis');

const redis = new Redis();
const redis2 = redis.duplicate();
const mailQueueKey = 'mailQueue';
const mailInTransitKey = 'mailInTransit';
const forever = 0;
let shuttingDown = false;
let msgDeliveryInProgress = false;

function waitForMail() {
  redis.brpoplpush(mailQueueKey, mailInTransitKey, forever, (err, result) => {
    if (err) {
      if (shuttingDown) return;
      console.error(err);
      return process.nextTick(waitForMail);
    }
    const val = result;
    sendMail(val, (err) => {
      if (err) { console.error(err); }
      process.nextTick(waitForMail);
    });
  });
}

function sendMail(val, cb) {
  // simulate mail delivery
  msgDeliveryInProgress = true;
  setTimeout(() => {
    console.log(`mail sent: ${val}`);
    redis2.lrem(mailInTransitKey, -1, val, (err, result) => {
      cb(err);
      if (shuttingDown) redis2.quit();
      msgDeliveryInProgress = false;
    });
  }, 10);
}

function shutdown() {
  shuttingDown = true;
  // use disconnect rather than quit since brpop blocks
  redis.disconnect();
  if (!msgDeliveryInProgress) redis2.quit();
}

process
  .once('SIGINT', shutdown)
  .once('SIGTERM', shutdown);

waitForMail();
