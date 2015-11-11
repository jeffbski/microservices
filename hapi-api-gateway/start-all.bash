#!/bin/bash
set -v # echo commands
node_modules/.bin/parallelshell "node legacy.js" "node friends.js" "node api-gateway.js"
