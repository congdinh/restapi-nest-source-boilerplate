#!/bin/bash
docker-compose -f docker-compose-local.yml build service/service-demo
docker-compose -f docker-compose-local.yml up
