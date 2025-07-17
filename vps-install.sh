#!/bin/bash

# Obscur Clothes VPS Installation Script
# Этот скрипт установит всё необходимое для работы на вашем VPS

set -e

echo "🔥 Установка Obscur Clothes на VPS..."

# Проверяем, что мы root или имеем sudo
if [[ $EUID -ne 0 ]]; then
   echo "Этот скрипт должен быть запущен от имени root или с sudo"
   exit 1
fi

# Обновляем систему
echo "📦 Обновление системы..."
apt update && apt upgrade -y

# Устанавливаем Docker
echo "🐳 Установка Docker..."
apt install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt update
apt install -y docker-ce docker-ce-cli containerd.io

# Устанавливаем Docker Compose
echo "🔧 Установка Docker Compose..."
curl -L "https://github.com/docker/compose/releases/download/v2.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Запускаем Docker
systemctl start docker
systemctl enable docker

# Устанавливаем Node.js (для сборки)
echo "📦 Установка Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Устанавливаем git
echo "📦 Установка Git..."
apt install -y git

# Проверяем установку
echo "✅ Проверка установки..."
docker --version
docker-compose --version
node --version
npm --version

echo "🎉 Установка завершена! Теперь можете клонировать ваш проект и запустить ./deploy-production.sh"
echo ""
echo "Следующие шаги:"
echo "1. Клонируйте ваш проект: git clone <ваш-репозиторий>"
echo "2. Перейдите в папку проекта: cd obscur-clothes"
echo "3. Запустите: ./deploy-production.sh"
echo ""
echo "Ваш сайт будет доступен на порту 80 (http://ваш-ip)"