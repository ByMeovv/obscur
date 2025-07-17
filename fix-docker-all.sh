#!/bin/bash

echo "🔧 Полное исправление для Docker сборки..."

# 1. Исправляем структуру проекта
echo "📁 Создаем необходимые директории..."
mkdir -p assets
mkdir -p client/public

# 2. Копируем логотип
echo "🖼️ Копируем логотип..."
if [ -f "logo.svg" ]; then
  cp logo.svg assets/
  cp logo.svg client/public/
else
  echo "Логотип не найден, создаем базовый..."
  cat > assets/logo.svg << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ff6b35;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#f7931e;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ffcd3c;stop-opacity:1" />
    </linearGradient>
  </defs>
  <circle cx="30" cy="30" r="25" fill="url(#logoGradient)"/>
  <g transform="translate(30,30)" stroke="#000" stroke-width="1.5" fill="none">
    <path d="M-8,-8 L8,8 M8,-8 L-8,8" stroke-width="2"/>
    <circle cx="0" cy="0" r="4" fill="#000"/>
  </g>
</svg>
EOF
  cp assets/logo.svg client/public/
fi

# 3. Исправляем конфигурацию Vite
echo "⚙️ Исправляем vite.config.ts..."
cd client
cat > vite.config.ts << 'EOF'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  root: __dirname,
  base: "./",
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu']
        }
      }
    }
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
EOF

# 4. Исправляем PostCSS
echo "🎨 Исправляем postcss.config.js..."
cat > postcss.config.js << 'EOF'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

# 5. Исправляем Tailwind конфигурацию
echo "🌈 Исправляем tailwind.config.ts..."
cat > tailwind.config.ts << 'EOF'
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'gothic-glow': 'gothic-glow 2s ease-in-out infinite',
        'gothic-float': 'gothic-float 3s ease-in-out infinite',
        'gothic-lightning': 'gothic-lightning 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'gothic-glow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'gothic-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'gothic-lightning': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(147, 51, 234, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(147, 51, 234, 0.8)' },
        },
        'glow': {
          from: { boxShadow: '0 0 20px rgba(147, 51, 234, 0.5)' },
          to: { boxShadow: '0 0 40px rgba(147, 51, 234, 0.8)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
EOF

# 6. Исправляем CSS
echo "💄 Исправляем src/index.css..."
cat > src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

/* CSS-переменные темы */
:root {
  --background: hsl(0, 0%, 0%);
  --foreground: hsl(0, 0%, 100%);
  --muted: hsl(0, 0%, 17.6%);
  --muted-foreground: hsl(0, 0%, 63.9%);
  --popover: hsl(0, 0%, 10.2%);
  --popover-foreground: hsl(0, 0%, 100%);
  --card: hsl(0, 0%, 10.2%);
  --card-foreground: hsl(0, 0%, 100%);
  --border: hsl(0, 0%, 17.6%);
  --input: hsl(0, 0%, 17.6%);
  --primary: hsl(262, 83%, 70%);
  --primary-foreground: hsl(0, 0%, 100%);
  --secondary: hsl(0, 0%, 17.6%);
  --secondary-foreground: hsl(0, 0%, 100%);
  --accent: hsl(0, 0%, 17.6%);
  --accent-foreground: hsl(0, 0%, 100%);
  --destructive: hsl(0, 62.8%, 30.6%);
  --destructive-foreground: hsl(0, 0%, 100%);
  --ring: hsl(262, 83%, 70%);
  --radius: 0.5rem;
  --obscur-purple: hsl(262, 83%, 70%);
  --obscur-lilac: hsl(270, 64%, 68%);
  --obscur-deep: hsl(262, 83%, 58%);
  --obscur-dark: hsl(0, 0%, 10.2%);
  --obscur-gray: hsl(0, 0%, 17.6%);
}

/* Базовые стили */
@layer base {
  /* Глобальные стили */
  * {
    @apply border-gray-800;
  }

  /* Тело страницы */
  body {
    @apply bg-black text-white font-sans antialiased;
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
  }

  /* Моноширинный шрифт */
  .font-mono {
    font-family: 'JetBrains Mono', monospace;
  }

  /* Единые стили для заголовков H1 во всех контекстах */
  :where(h1) {
    font-size: 2em;
    margin-block: 0.67em;
  }
}

/* Кастомные компоненты */
@layer components {
  /* Анимированный фон огня */
  .fire-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #000000 0%, #1a1a1a 25%, #2d2d2d 50%, #1a1a1a 75%, #000000 100%);
    background-size: 400% 400%;
    animation: fire 4s ease-in-out infinite;
    z-index: -1;
  }

  /* Эффекты свечения */
  .glow-effect {
    animation: glow 2s ease-in-out infinite alternate;
  }

  .animate-glow {
    animation: glow 2s ease-in-out infinite alternate;
  }

  .gradient-text {
    background: linear-gradient(135deg, #9333ea 0%, #6b7280 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
  }

  /* Анимации */
  .gothic-glow {
    animation: gothic-glow 2s ease-in-out infinite;
  }

  .gothic-float {
    animation: gothic-float 3s ease-in-out infinite;
  }

  .gothic-lightning {
    animation: gothic-lightning 2s ease-in-out infinite;
  }

  .gothic-slide-in {
    animation: slide-in-from-bottom 0.8s ease-out;
  }
}

/* Анимации */
@keyframes fire {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes glow {
  from { box-shadow: 0 0 20px rgba(147, 51, 234, 0.5); }
  to { box-shadow: 0 0 40px rgba(147, 51, 234, 0.8); }
}

@keyframes gothic-glow {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

@keyframes gothic-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes gothic-lightning {
  0%, 100% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.5); }
  50% { box-shadow: 0 0 40px rgba(147, 51, 234, 0.8); }
}

@keyframes slide-in-from-bottom {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Адаптивность */
@media (max-width: 768px) {
  .fire-bg {
    animation-duration: 6s;
  }
  
  .gradient-text {
    font-size: 1.5rem;
  }
}

/* Утилиты */
@layer utilities {
  .animate-spin-slow {
    animation: spin 3s linear infinite;
  }

  .text-shadow-lg {
    text-shadow: 0 0 20px rgba(147, 51, 234, 0.5);
  }

  .backdrop-blur-strong {
    backdrop-filter: blur(10px);
  }
}
EOF

cd ..

# 7. Исправляем Docker файл
echo "🐳 Исправляем Dockerfile.frontend..."
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

# Создаем пользователя для безопасности
RUN addgroup -g 1001 -S nginx
RUN adduser -S nginx -u 1001

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
EOF

# 8. Убираем устаревший version из compose.yaml
echo "🔧 Исправляем compose.yaml..."
sed -i '/^version:/d' compose.yaml

echo "✅ Все исправления применены!"
echo "🚀 Теперь можно запускать: ./docker-compose-start.sh"
echo "📋 Или попробуйте: docker compose up --build"