#!/bin/bash
#
aws s3 sync . s3://skicyclerun.com \
  --exclude "api/resize/node_modules/*"\
  --exclude "node_modules/*"\
  --exclude ".git/*"\
  --exclude ".gitignore"\
  --exclude '*.DS_Store'\
  --exclude ".*"\
  --delete
