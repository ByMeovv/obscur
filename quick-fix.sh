#!/bin/bash

echo "🔧 Быстрое исправление Docker проблем..."

# Останавливаем все контейнеры
docker compose down

# Удаляем старые образы
docker image prune -f

# Создаем исправленный Dockerfile.backend
cat > Dockerfile.backend << 'EOF'
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем package.json для установки зависимостей
COPY package*.json ./
RUN npm ci

# Копируем исходный код
COPY server ./server
COPY shared ./shared
COPY tsconfig.json ./

# Создаем директорию dist
RUN mkdir -p dist

# Собираем backend с правильными флагами (используем оригинальный index.ts)
RUN npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outfile=dist/index.js

# Production stage
FROM node:20-alpine

WORKDIR /app

# Создаем минимальный package.json с vite включенным
RUN echo '{ \
  "name": "obscur-backend", \
  "version": "1.0.0", \
  "type": "module", \
  "main": "dist/index.js", \
  "dependencies": { \
    "express": "^4.21.2", \
    "vite": "^5.4.11" \
  } \
}' > package.json

# Устанавливаем зависимости
RUN npm install

# Копируем собранный файл из builder stage
COPY --from=builder /app/dist ./dist

# Создаем пользователя для безопасности
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Меняем владельца файлов
RUN chown -R nodejs:nodejs /app
USER nodejs

# Открываем порт
EXPOSE 5000

# Переменные окружения для production
ENV NODE_ENV=production
ENV PORT=5000

# Запускаем backend
CMD ["node", "dist/index.js"]
EOF

echo "🚀 Запускаем исправленный Docker..."
docker compose up --build -d

echo "⏳ Ждем 10 секунд..."
sleep 10

echo "📊 Статус контейнеров:"
docker compose ps

echo "📋 Логи backend:"
docker compose logs backend --tail=20

echo "✅ Готово!"