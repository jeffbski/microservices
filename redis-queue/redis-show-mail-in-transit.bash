#!/bin/bash
set -v # echo commands
redis-cli lrange mailInTransit 0 -1
