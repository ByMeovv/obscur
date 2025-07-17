# 🔥 Obscur Clothes - Запуск на VPS

## Самый простой способ (1 команда)

### Шаг 1: Установка на VPS
```bash
# Скачайте ВСЕ файлы проекта на ваш VPS
# Затем выполните:
sudo ./vps-install.sh
```

### Шаг 2: Запуск приложения
```bash
# Вариант 1: Одна команда (рекомендуется)
./run-one-command.sh

# Вариант 2: Пошагово
./fix-styling-production.sh
./deploy-production.sh

# Вариант 3: Через Docker Compose
./docker-compose-start.sh
```

### Шаг 3: Готово! 🎉
Ваш сайт работает на **http://ваш-ip**

---

## Что нужно скопировать на VPS

### Основные файлы:
- `Dockerfile.backend` - Docker образ бэкенда
- `client/Dockerfile.frontend` - Docker образ фронтенда
- `compose.yaml` - Конфигурация Docker Compose

### Скрипты запуска:
- `vps-install.sh` - Установка Docker и зависимостей
- `run-one-command.sh` - Запуск одной командой ⭐
- `deploy-production.sh` - Основной скрипт развертывания
- `fix-styling-production.sh` - Исправление стилей
- `docker-compose-start.sh` - Запуск через Docker Compose

### Документация:
- `README-VPS.md` - Подробная инструкция
- `ЗАПУСК-НА-VPS.md` - Эта инструкция

### Код приложения:
- `server/` - Бэкенд код
- `client/` - Фронтенд код  
- `shared/` - Общие типы
- `package.json` - Зависимости

---

## Требования к серверу

- **Ubuntu 20.04+** (или Debian/CentOS)
- **2GB RAM** минимум
- **20GB диск** минимум
- **Порты**: 80 (HTTP), 5000 (API)

---

## Команды управления

### Просмотр логов
```bash
docker logs obscur_backend
docker logs obscur_frontend
```

### Остановка/перезапуск
```bash
# Остановка
docker stop obscur_backend obscur_frontend

# Перезапуск
docker restart obscur_backend obscur_frontend

# Полная переустановка
./run-one-command.sh
```

### Мониторинг
```bash
# Статус контейнеров
docker ps | grep obscur

# Использование ресурсов
docker stats

# Проверка работы
curl -I http://localhost
```

---

## Возможные проблемы

### 1. Порт 80 занят
```bash
sudo netstat -tlnp | grep :80
sudo systemctl stop nginx apache2
```

### 2. Нет Docker
```bash
sudo ./vps-install.sh
```

### 3. Проблемы со стилями
```bash
./fix-styling-production.sh
```

### 4. Ошибки сборки
```bash
# Очистка и пересборка
docker system prune -a
./run-one-command.sh
```

---

## Что происходит при запуске

1. **Сборка фронтенда**: React + Vite → статические файлы
2. **Сборка бэкенда**: TypeScript → JavaScript
3. **Создание Docker образов**: nginx + Node.js
4. **Запуск контейнеров**: с health checks и auto-restart
5. **Проверка работы**: HTTP тест

---

## Результат

После успешного запуска:
- **Фронтенд**: http://ваш-ip (nginx)
- **Бэкенд API**: http://ваш-ip:5000 (Node.js)
- **Автоматический перезапуск** при сбоях
- **Логирование** всех операций
- **Оптимизированные стили** для продакшена

---

**Всё готово для работы "как швейцарские часы"! 🕰️**