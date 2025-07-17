#!/bin/bash

echo "🔧 Исправление Docker backend проблем..."

# 1. Исправляем Dockerfile.backend
echo "🐳 Создаем исправленный Dockerfile.backend..."
cat > Dockerfile.backend << 'EOF'
FROM node:20-alpine

# Директория в контейнере
WORKDIR /app

# Копируем package.json для установки зависимостей
COPY package*.json ./

# Устанавливаем все зависимости (нужны для сборки)
RUN npm ci

# Копируем исходный код
COPY server ./server
COPY shared ./shared
COPY tsconfig.json ./

# Создаем директорию dist
RUN mkdir -p dist

# Собираем backend с правильными флагами
RUN npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outfile=dist/index.js

# Создаем production package.json только с runtime зависимостями
RUN echo '{ \
  "name": "obscur-backend", \
  "version": "1.0.0", \
  "type": "module", \
  "main": "dist/index.js", \
  "dependencies": { \
    "express": "^4.21.2", \
    "serve-static": "^2.2.0" \
  } \
}' > package-prod.json

# Удаляем node_modules и устанавливаем только runtime зависимости
RUN rm -rf node_modules package*.json && mv package-prod.json package.json
RUN npm install --only=production

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

# 2. Исправляем server/index.ts
echo "⚙️ Исправляем server/index.ts..."
cat > server/index.ts << 'EOF'
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import path from "path";

// Simple logger function for production
const log = (message: string) => {
  console.log(`[${new Date().toISOString()}] ${message}`);
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  // Environment-specific setup
  if (process.env.NODE_ENV === "development") {
    // Development: setup Vite
    try {
      const { setupVite } = await import("./vite");
      await setupVite(app, server);
    } catch (error) {
      log("Vite setup failed, falling back to static files");
    }
  } else {
    // Production: serve static files
    const staticPath = path.join(process.cwd(), "client/dist");
    app.use(express.static(staticPath));
    
    // Serve index.html for all non-API routes (SPA routing)
    app.get("*", (req, res) => {
      if (req.path.startsWith("/api")) {
        res.status(404).json({ message: "API endpoint not found" });
      } else {
        res.sendFile(path.join(staticPath, "index.html"));
      }
    });
  }

  const port = parseInt(process.env.PORT || "5000");
  server.listen(port, "0.0.0.0", () => {
    log(`serving on port ${port}`);
  });
})();
EOF

# 3. Исправляем client/Dockerfile.frontend (убираем adduser)
echo "🎨 Исправляем client/Dockerfile.frontend..."
cat > client/Dockerfile.frontend << 'EOF'
# Многоэтапная сборка
FROM node:20-alpine AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем только папку клиента целиком
COPY client/ ./

# Копируем статические файлы из корневой папки
COPY assets/ ./public/

# Устанавливаем зависимости (теперь из package.json внутри /app)
RUN npm ci

# Собираем приложение (Vite build создаст /dist)
RUN npm run build

# Производственный образ
FROM nginx:alpine

# Копируем собранное приложение из этапа build
COPY --from=build /app/dist /usr/share/nginx/html

# Создаем улучшенный конфигурационный файл nginx
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    # Включаем gzip сжатие \
    gzip on; \
    gzip_vary on; \
    gzip_min_length 1024; \
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json; \
    \
    # Безопасность \
    add_header X-Frame-Options "SAMEORIGIN" always; \
    add_header X-Content-Type-Options "nosniff" always; \
    add_header X-XSS-Protection "1; mode=block" always; \
    \
    # Обработка SPA-роутов (для React, чтобы все пути вели к index.html) \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    \
    # Отдача ассетов (CSS, JS, изображения для background) с кэшем \
    location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
        add_header Vary Accept-Encoding; \
        try_files $uri =404; \
    } \
    \
    # Прокси на API (если нужно) \
    location /api/ { \
        proxy_pass http://backend:5000/api/; \
        proxy_set_header Host $host; \
        proxy_set_header X-Real-IP $remote_addr; \
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; \
        proxy_set_header X-Forwarded-Proto $scheme; \
        proxy_cache_bypass $http_upgrade; \
    } \
    \
    # Обработка ошибок \
    error_page 404 /index.html; \
    error_page 500 502 503 504 /index.html; \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
EOF

# 4. Убираем version из compose.yaml
echo "🔧 Исправляем compose.yaml..."
sed -i '/^version:/d' compose.yaml

echo "✅ Все исправления применены!"
echo "🚀 Теперь можно запускать: ./docker-compose-start.sh"
echo "📋 Или попробуйте: docker compose up --build"