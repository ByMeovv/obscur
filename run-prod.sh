#!/bin/bash

# Build frontend
echo "Building frontend..."
cd client && npm run build && cd ..

# Build backend
echo "Building backend..."
npm run build

# Start production server
echo "Starting production server..."
NODE_ENV=production node dist/index.js