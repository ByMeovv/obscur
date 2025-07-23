#!/bin/bash

echo "🚀 Starting Obscur Clothes Docker setup..."

# Stop any existing containers
echo "Stopping existing containers..."
docker-compose down

# Build and start the application
echo "Building and starting containers..."
docker-compose up --build -d

# Wait for the application to be ready
echo "Waiting for application to be ready..."
sleep 10

# Check if the application is healthy
echo "Checking application health..."
for i in {1..30}; do
    if curl -f http://localhost:5000/health > /dev/null 2>&1; then
        echo "✅ Application is running successfully!"
        echo "🌐 Access your site at: http://localhost:5000"
        exit 0
    fi
    echo "⏳ Waiting for application... ($i/30)"
    sleep 2
done

echo "❌ Application failed to start properly"
echo "📋 Checking logs..."
docker-compose logs --tail=50

exit 1