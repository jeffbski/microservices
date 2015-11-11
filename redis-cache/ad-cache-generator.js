'use strict';

const findNextAd = require('./find-next-ad');
const Redis = require('ioredis');

const adCacheKey = 'adCache';
const lowThreshold = 100;
const highThreshold = 400;
const checkLevelMSecs = 1000;
const redis = new Redis();
let shuttingDown = false;
let generating = false;

function checkLevel() {
  if (shuttingDown) { return; }
  redis.llen(adCacheKey, (err, len) => {
    if (err) { return console.error(err); }
    if (generating) {
      if (len > highThreshold) { stopGenerator(); }
    } else { // not generating
      if (len < lowThreshold) { startGenerator(); }
    }
    console.log(`level: ${len} ${(generating) ? 'generating' : ''}`);
  });
}

function startGenerator() {
  if (generating) { return; }
  generating = true;
  generate();
}

function stopGenerator() {
  generating = false;
}

function generate() {
  if (!generating) { return; }
  findNextAd((err, ad) => {
    if (shuttingDown) { return; }
    if (err) { return console.error(err); }
    redis.lpush(adCacheKey, ad, (err, result) => {
      if (err) { console.error(err); }
      setImmediate(generate);
    });
  });
}

const checkInterval = setInterval(checkLevel, checkLevelMSecs);

function shutdown() {
  shuttingDown = true;
  generating = false;
  clearInterval(checkInterval);
  redis.quit();
}

process
  .once('SIGINT', shutdown)
  .once('SIGTERM', shutdown);
