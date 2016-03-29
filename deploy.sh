#!/bin/sh
gulp
cd build
node-lambda deploy --configFile deploy.env