#!/bin/bash

# Obscur Clothes Production Deployment Script
# This script builds and deploys the application with proper styling

set -e

echo "🔥 Запуск продакшен развертывания Obscur Clothes..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Clean previous builds
print_status "Очистка предыдущих сборок..."
rm -rf client/dist
rm -rf dist

# Build frontend
print_status "Сборка фронтенда с оптимизированным CSS..."
cd client
npm ci
npm run build

# Verify frontend build
if [ ! -f "dist/index.html" ]; then
    print_error "Frontend build failed - index.html not found"
    exit 1
fi

if [ ! -f "dist/assets/index-"*.css ]; then
    print_error "Frontend build failed - CSS file not found"
    exit 1
fi

print_status "Сборка фронтенда завершена ✓"
cd ..

# Build backend
print_status "Сборка бэкенда..."
npm ci
npm run build

# Verify backend build
if [ ! -f "dist/index.js" ]; then
    print_error "Backend build failed - index.js not found"
    exit 1
fi

print_status "Сборка бэкенда завершена ✓"

# Create production env file
print_status "Создание конфигурации для продакшена..."
cat > .env.production << EOF
NODE_ENV=production
PORT=5000
VITE_API_URL=http://localhost:5000/api
EOF

# Build Docker images
print_status "Building Docker images..."

# Build backend image
docker build -t obscur-backend:latest -f Dockerfile.backend .
if [ $? -ne 0 ]; then
    print_error "Backend Docker build failed"
    exit 1
fi

# Build frontend image
docker build -t obscur-frontend:latest -f client/Dockerfile.frontend .
if [ $? -ne 0 ]; then
    print_error "Frontend Docker build failed"
    exit 1
fi

print_status "Docker images built successfully ✓"

# Create network if it doesn't exist
docker network create obscur_network 2>/dev/null || true

# Stop and remove existing containers
print_status "Stopping existing containers..."
docker stop obscur_backend obscur_frontend 2>/dev/null || true
docker rm obscur_backend obscur_frontend 2>/dev/null || true

# Run backend container
print_status "Starting backend container..."
docker run -d \
    --name obscur_backend \
    --network obscur_network \
    --env-file .env.production \
    --restart unless-stopped \
    obscur-backend:latest

# Wait for backend to be ready
print_status "Waiting for backend to be ready..."
sleep 5

# Run frontend container
print_status "Starting frontend container..."
docker run -d \
    --name obscur_frontend \
    --network obscur_network \
    -p 80:80 \
    --restart unless-stopped \
    obscur-frontend:latest

# Wait for services to be ready
print_status "Waiting for services to be ready..."
sleep 10

# Test the deployment
print_status "Testing deployment..."
if curl -s http://localhost:80 | grep -q "Obscur Clothes"; then
    print_status "✅ Развертывание успешно! Ваш готический магазин работает на http://localhost"
else
    print_error "❌ Тест развертывания не прошел"
    exit 1
fi

# Show container status
print_status "Статус контейнеров:"
docker ps | grep obscur

print_status "🎉 Продакшен развертывание завершено!"
print_status "Ваш сайт Obscur Clothes теперь работает на:"
print_status "  - Фронтенд: http://localhost"
print_status "  - Бэкенд API: http://localhost:5000"
print_status ""
print_status "Для просмотра логов:"
print_status "  - Бэкенд: docker logs obscur_backend"
print_status "  - Фронтенд: docker logs obscur_frontend"
print_status ""
print_status "Для остановки приложения:"
print_status "  docker stop obscur_backend obscur_frontend"