#!/bin/bash
set -v # echo commands
redis-cli lrange mailQueue 0 -1
