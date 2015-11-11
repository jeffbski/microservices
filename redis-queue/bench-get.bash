#!/bin/bash
set -v # echo commands
redis-benchmark -t GET -d 256 -n 10000 -P 10
