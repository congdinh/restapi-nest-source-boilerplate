#!/bin/bash
docker-compose -f docker-compose.yml build service/service-demo
docker-compose -f docker-compose.yml up -d
