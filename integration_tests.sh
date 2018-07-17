#!/bin/bash

docker-compose -f docker-compose.test.yml --project-name test up --abort-on-container-exit
docker-compose -f docker-compose.test.yml --project-name test down
