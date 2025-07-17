#!/bin/bash

# Obscur Clothes - Docker Compose запуск
# Альтернативный способ запуска через docker-compose

set -e

echo "🔥 Запуск через Docker Compose..."

# Остановка старых контейнеров
echo "Остановка старых контейнеров..."
docker-compose down 2>/dev/null || true

# Удаление старых образов
echo "Очистка старых образов..."
docker-compose down --rmi all 2>/dev/null || true

# Сборка и запуск
echo "Сборка и запуск контейнеров..."
docker-compose up --build -d

# Ожидание запуска
echo "Ожидание запуска сервисов..."
sleep 10

# Проверка статуса
echo "Проверка статуса..."
docker-compose ps

# Проверка работы
echo "Проверка работы сайта..."
if curl -s http://localhost | grep -q "Obscur Clothes"; then
    echo "✅ Сайт работает! http://localhost"
else
    echo "❌ Проблемы с запуском"
    docker-compose logs
fi

echo ""
echo "Команды для управления:"
echo "  - Просмотр логов: docker-compose logs"
echo "  - Остановка: docker-compose down"
echo "  - Перезапуск: docker-compose restart"