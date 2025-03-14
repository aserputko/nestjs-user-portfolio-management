set -e  # Exit immediately if a command exits with a non-zero status.
set -x  # Enable debugging

# Load environment variables from .env file
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

VERSION="latest"
USERNAME="aserputko"
REPO="user-portfolio-management-api-service"

# Build the Docker image with two tags: one for the version and one for "latest".
docker run -e PORT=${PORT} \
    -e JWT_SECRET=${JWT_SECRET} \
    -e JWT_TOKEN_EXPIRATION=${JWT_TOKEN_EXPIRATION} \
    -e DATABASE_USER=${DATABASE_USER} \
    -e DATABASE_PASSWORD=${DATABASE_PASSWORD} \
    -e DATABASE_NAME=${DATABASE_NAME} \
    -e DATABASE_PORT=${DATABASE_PORT} \
    -e DATABASE_HOST=${DATABASE_HOST} \
    -p 3000:3000 \
    --network my-network \
    ${USERNAME}/${REPO}:${VERSION}


