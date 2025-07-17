#!/bin/bash

echo "🔧 Исправление CSS для Docker сборки..."

# Исправляем проблемы с CSS в client/src/index.css
cd client/src
cat > index.css << 'EOF'
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

cd ../..

echo "✅ CSS исправлен для Docker сборки!"
echo "🚀 Теперь можно запускать: ./docker-compose-start.sh"