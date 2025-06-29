#!/bin/sh

# Step 1: Generate OpenAPI spec and routes using tsoa
npx tsoa spec-and-routes

# Step 2: Generate client SDK
npx @openapitools/openapi-generator-cli generate \
  -i ./build/swagger.json \
  -o ./client \
  -g typescript-fetch
