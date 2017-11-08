#!/bin/bash
#
aws s3 sync . s3://skicyclerun.com --exclude "api/node_modules/*" --exclude "node_modules/*" --exclude '*.DS_Store'  --exclude ".*" --delete
