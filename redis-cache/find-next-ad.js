'use strict';

const faker = require('faker');

const ADS = ['CodeWinds', 'Nodevember', 'NashJS'];

function findNextAd(cb) {
  setTimeout(function () {
    // secret ad balancing method
    const ad = faker.random.arrayElement(ADS);
    cb(null, ad);
  }, 10);
}

module.exports = findNextAd;
