# Obscur Clothes - Развертывание на VPS

## Быстрая установка (1 команда)

### 1. Подготовка VPS сервера
```bash
# Скачайте все файлы проекта на ваш VPS
# Затем запустите установочный скрипт:
sudo chmod +x vps-install.sh
sudo ./vps-install.sh
```

### 2. Запуск приложения
```bash
# Исправление стилей (опционально)
./fix-styling-production.sh

# Развертывание приложения
./deploy-production.sh
```

### 3. Готово! 🎉
Ваш сайт будет работать на:
- **Фронтенд**: http://ваш-ip
- **API**: http://ваш-ip:5000

## Структура проекта

```
obscur-clothes/
├── Dockerfile.backend          # Docker образ для бэкенда
├── client/
│   └── Dockerfile.frontend     # Docker образ для фронтенда
├── compose.yaml               # Docker Compose конфигурация
├── deploy-production.sh       # Основной скрипт развертывания
├── fix-styling-production.sh  # Исправление стилей
├── vps-install.sh            # Установка на VPS
└── README-VPS.md             # Эта инструкция
```

## Команды управления

### Просмотр логов
```bash
# Логи бэкенда
docker logs obscur_backend

# Логи фронтенда
docker logs obscur_frontend
```

### Остановка приложения
```bash
docker stop obscur_backend obscur_frontend
```

### Перезапуск
```bash
docker restart obscur_backend obscur_frontend
```

### Полное обновление
```bash
# Остановка и удаление старых контейнеров
docker stop obscur_backend obscur_frontend
docker rm obscur_backend obscur_frontend

# Повторный запуск
./deploy-production.sh
```

## Требования к серверу

- **Ubuntu 20.04+** (рекомендуется)
- **2GB RAM** минимум
- **20GB диск** минимум
- **Порты**: 80 (HTTP), 5000 (API)

## Возможные проблемы и решения

### 1. Порт 80 занят
```bash
# Проверить, что использует порт 80
sudo netstat -tlnp | grep :80

# Остановить nginx/apache если они есть
sudo systemctl stop nginx
sudo systemctl stop apache2
```

### 2. Проблемы с Docker
```bash
# Перезапуск Docker
sudo systemctl restart docker

# Очистка старых образов
docker system prune -a
```

### 3. Проблемы со стилями
```bash
# Запустить исправление стилей
./fix-styling-production.sh
```

## Мониторинг

### Проверка работы
```bash
# Проверить HTTP ответ
curl -I http://localhost

# Проверить API
curl http://localhost:5000/api/health
```

### Системные ресурсы
```bash
# Использование контейнерами
docker stats

# Свободное место
df -h
```

## Безопасность

- Контейнеры работают от непривилегированных пользователей
- Включены базовые заголовки безопасности
- Рекомендуется настроить SSL/TLS для продакшена

## Поддержка

Если что-то не работает:
1. Проверьте логи контейнеров
2. Убедитесь, что порты 80 и 5000 свободны
3. Проверьте, что Docker запущен: `systemctl status docker`

---

**Всё готово для запуска! Скопируйте файлы на ваш VPS и запустите `./deploy-production.sh`**