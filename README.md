# Microservices Examples

Examples of building simple microservices using Node.js, Redis, and Hapi

## Talks referencing these examples

 - [Building simple Node.js microservices using Hapi and Redis - Nodevember 2015](http://codewinds.com/nc2015)

## Installation

Enter the directory of the example and `npm install`

## redis-queue

An example of using a redis list as a queue for a microservice mail server. Microservice mail delivery processes can be spun up to listen to the queue and wait for work.

Another version done using a reliable queue where an additional list is used to track messages in transit. If a processes fails to deliver with in a specified amount of time, an item could be moved back to the original queue for delivery.

## redis-cache

An example of using microservice(s) to prepopulate a redis list cache. An expensive computation like determining the next ads to display across campaigns could be done in advance by microservice workers and the results put into a cache queue for use. The microservice(s) can monitor the queue height and generate more when the count drops to a certain level.

## hapi-api-gateway

Examples using hapi to build simple microservices and using hapi to build simple API proxies or smart API gateways. An API gateway can aggregate data from to many microservices into one call.

Hapi plugins are a nice mechanism for moving microservice funtionality between servers. By splitting off groups of functionality into plugins they can be used in a monolith application or easily moved into their own containers and servers.
