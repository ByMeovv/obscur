#!/bin/bash

# Obscur Clothes - Запуск одной командой
# Этот скрипт сделает всё: исправит стили, соберет и запустит приложение

set -e

echo "🔥 Obscur Clothes - Запуск одной командой..."

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Проверяем Docker
if ! command -v docker &> /dev/null; then
    print_error "Docker не установлен! Запустите сначала: sudo ./vps-install.sh"
    exit 1
fi

# Проверяем Docker Compose
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose не установлен! Запустите сначала: sudo ./vps-install.sh"
    exit 1
fi

# Останавливаем старые контейнеры
print_status "Остановка старых контейнеров..."
docker stop obscur_backend obscur_frontend 2>/dev/null || true
docker rm obscur_backend obscur_frontend 2>/dev/null || true

# Удаляем старые образы
print_status "Очистка старых образов..."
docker rmi obscur-backend:latest obscur-frontend:latest 2>/dev/null || true

# Исправляем стили
print_status "Исправление стилей..."
./fix-styling-production.sh

# Запускаем развертывание
print_status "Запуск развертывания..."
./deploy-production.sh

print_status "🎉 Готово! Ваш сайт работает на:"
print_status "  - Фронтенд: http://localhost"
print_status "  - Бэкенд API: http://localhost:5000"
print_status ""
print_status "Для просмотра логов:"
print_status "  - docker logs obscur_backend"
print_status "  - docker logs obscur_frontend"