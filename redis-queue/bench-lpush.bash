#!/bin/bash
set -v # echo commands
redis-benchmark -t LPUSH -d 256 -n 10000 -P 10
