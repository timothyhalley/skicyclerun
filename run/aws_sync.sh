#!/bin/bash
#
aws sts get-caller-identity

aws s3 sync ~/Projects/SkiCycleRun/skicyclerun.com s3://skicyclerun.com \
  --exclude "node_modules/*" \
  --exclude "run/*" \
  --exclude ".git/*" \
  --exclude ".gitignore" \
  --exclude '*.DS_Store' \
  --exclude ".*" \
  --delete
