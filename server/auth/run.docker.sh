#!/bin/bash

set -x

docker rm be-e-voting
docker build . -t be-e-voting
docker run --net=host -p $1:$1 --name=be-e-voting --env-file ./.env \
    be-template:latest
