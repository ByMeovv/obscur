#!/bin/bash

# Скрипт для запуска приложения через Docker на VPS
echo "🚀 Запуск OBSCUR Clothes приложения..."

# Остановка и удаление старых контейнеров
echo "📦 Остановка старых контейнеров..."
docker-compose down
docker system prune -f

# Удаление package-lock.json файлов для предотвращения конфликтов
echo "🧹 Очистка lock файлов..."
rm -f package-lock.json
rm -f client/package-lock.json

# Сборка и запуск новых контейнеров
echo "🔨 Сборка и запуск приложения..."
docker-compose up --build -d

# Ожидание запуска
echo "⏳ Ожидание готовности приложения..."
sleep 30

# Проверка статуса
echo "✅ Проверка статуса контейнеров..."
docker-compose ps

# Проверка логов
echo "📋 Последние логи приложения:"
docker-compose logs --tail=20 backend

# Проверка health check
echo "🔍 Проверка работоспособности..."
if curl -f -s http://localhost/health >/dev/null; then
    echo "🎉 Приложение успешно запущено!"
    echo "🌐 Сайт доступен по адресу: http://your-domain.com"
    echo "📱 Telegram: https://t.me/obscur_clothes"
else
    echo "⚠️  Приложение запускается... Проверьте логи:"
    echo "docker-compose logs backend"
fi

echo "📊 Для просмотра логов: docker-compose logs -f"
echo "🛑 Для остановки: docker-compose down"