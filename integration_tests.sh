#!/bin/bash

docker-compose -f docker-compose.test.yml -p test up --abort-on-container-exit
docker-compose -f docker-compose.test.yml -p test down
