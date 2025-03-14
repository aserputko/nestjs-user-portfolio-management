#!/bin/bash
set -e  # Exit immediately if a command exits with a non-zero status.

# Check if version argument is provided, otherwise use a default value.
if [ -z "$1" ]; then
  echo "The version is missing"
  echo "Run: sh $0 <version>"
  exit 1
fi

VERSION="$1"
USERNAME="aserputko"
REPO="user-portfolio-management-api-service"

# Build the Docker image with two tags: one for the version and one for "latest".
docker build -t ${USERNAME}/${REPO}:${VERSION} -t ${USERNAME}/${REPO}:latest .