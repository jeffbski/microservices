#!/bin/bash
set -v # echo commands
redis-server --bind 127.0.0.1 --appendonly yes --appendfsync always
