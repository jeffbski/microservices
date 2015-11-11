'use strict';

const findNextAd = require('./find-next-ad');
const Redis = require('ioredis');

const adCacheKey = 'adCache';
const delayBetweenAdUseMSecs = 20;

const redis = new Redis();
let shuttingDown = false;

function useAd() {
  if (shuttingDown) { return; }
  redis.rpop(adCacheKey, (err, ad) => {
    if (err) { return console.error(err); }
    if (ad) {
      console.log(ad);
      setTimeout(useAd, delayBetweenAdUseMSecs);
      return;
    }
    findNextAd((err, ad) => {
      if (err) { return console.error(err); }
      console.log(`*********** cache-miss ${ad}`);
      setTimeout(useAd, delayBetweenAdUseMSecs);
    });
  });
}

useAd();

function shutdown() {
  shuttingDown = true;
  redis.quit();
}

process
  .once('SIGINT', shutdown)
  .once('SIGTERM', shutdown);
