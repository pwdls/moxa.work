#!/bin/bash
lifetimeDay=`cat ./config.json | jq '.server.lifetimeDay'`
dirData=`cat ./config.json | jq -r '.server.dir'`
dirOrigin=`cat ./config.json | jq -r '.server.dirOrigin'`

find $dirData -type d -mtime +$lifetimeDay -exec rm -rf {} \;
find $dirData -type f -mtime +$lifetimeDay -exec rm -rf {} \;

find $dirOrigin -type d -mtime +$lifetimeDay -exec rm -rf {} \;
find $dirOrigin -type d -mtime +$lifetimeDay -exec rm -rf {} \;