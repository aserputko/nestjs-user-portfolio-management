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

# Log in to Docker Hub (you'll be prompted for your Docker Hub credentials).
docker login

# Push the version tag.
docker push ${USERNAME}/${REPO}:${VERSION}

# Push the latest tag.
docker push ${USERNAME}/${REPO}:latest

echo "Docker image successfully built and pushed to Docker Hub with version ${VERSION}!"