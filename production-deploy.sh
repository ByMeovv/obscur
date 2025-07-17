#!/bin/bash

echo "🚀 Создание полностью готового production сборки..."

# Останавливаем все контейнеры
echo "🛑 Останавливаем все контейнеры..."
docker compose down

# Удаляем старые образы
echo "🧹 Удаляем старые образы..."
docker image prune -f

# Создаем чистый production backend
echo "🐳 Создаем чистый production backend..."
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

# Создаем минимальный package.json с только нужными зависимостями
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

# Устанавливаем только runtime зависимости
RUN npm install --only=production

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

# Создаем чистый frontend
echo "🎨 Создаем чистый frontend..."
cat > client/Dockerfile.frontend << 'EOF'
FROM node:20-alpine AS build

WORKDIR /app

# Копируем только папку клиента целиком
COPY client/ ./

# Копируем статические файлы из корневой папки
COPY assets/ ./public/

# Устанавливаем зависимости
RUN npm ci

# Собираем приложение
RUN npm run build

# Производственный образ
FROM nginx:alpine

# Копируем собранное приложение из этапа build
COPY --from=build /app/dist /usr/share/nginx/html

# Создаем конфигурационный файл nginx
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    gzip on; \
    gzip_vary on; \
    gzip_min_length 1024; \
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json; \
    \
    add_header X-Frame-Options "SAMEORIGIN" always; \
    add_header X-Content-Type-Options "nosniff" always; \
    add_header X-XSS-Protection "1; mode=block" always; \
    \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    \
    location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
        add_header Vary Accept-Encoding; \
        try_files $uri =404; \
    } \
    \
    location /api/ { \
        proxy_pass http://backend:5000/api/; \
        proxy_set_header Host $host; \
        proxy_set_header X-Real-IP $remote_addr; \
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; \
        proxy_set_header X-Forwarded-Proto $scheme; \
        proxy_cache_bypass $http_upgrade; \
    } \
    \
    error_page 404 /index.html; \
    error_page 500 502 503 504 /index.html; \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
EOF

# Создаем compose.yaml без version
echo "⚙️ Создаем compose.yaml..."
cat > compose.yaml << 'EOF'
services:
  backend:
    build:
      context: .
      dockerfile: Dockerfile.backend
    container_name: obscur_backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - PORT=5000
    restart: unless-stopped
    networks:
      - app-network

  frontend:
    build:
      context: .
      dockerfile: client/Dockerfile.frontend
    container_name: obscur_frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: unless-stopped
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
EOF

echo "🏗️ Собираем и запускаем контейнеры..."
docker compose up --build -d

echo "⏳ Ждем запуска контейнеров..."
sleep 10

echo "📊 Статус контейнеров:"
docker compose ps

echo "📋 Логи backend:"
docker compose logs backend

echo "✅ Production сборка готова!"
echo "🌐 Ваш сайт доступен по адресу: http://localhost"
echo "🔧 API доступен по адресу: http://localhost:5000/api"