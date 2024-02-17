#!/bin/bash

set -x

docker rm be-template
docker build . -t be-template
docker run --net=host -p $1:$1 --name=be-template --env-file ./.env \
    be-template:latest
