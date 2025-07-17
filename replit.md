# Obscur Clothes - Gothic Streetwear Store

## Project Overview
A premium gothic streetwear clothing store website featuring Rick Owens, Balenciaga and other high-end brands. Built with React frontend and Express backend in production-ready configuration.

## Architecture
- **Frontend**: React with TypeScript, shadcn/ui components, Tailwind CSS
- **Backend**: Express.js with TypeScript
- **Production**: Docker containerized deployment (frontend + backend)
- **Deployment**: Docker Compose with nginx for frontend, node.js for backend

## Production Configuration
- Frontend: Built with Vite and served via nginx 
- Backend: Express server serving API routes and static files
- Docker containers: `Dockerfile.backend` and `client/Dockerfile.frontend`
- Production script: `run-prod.sh` for local testing

## Features
- Gothic-themed UI with fire animations
- Product listings for premium streetwear
- Real-time updates system
- Responsive design with dark theme
- Mobile-friendly navigation

## User Preferences
- Keep Docker configuration with two separate Dockerfiles
- Production build should maintain same visual quality as development
- Russian language interface for target market

## Recent Changes
- **2025-01-17**: Migrated from Replit Agent to Replit environment
- **2025-01-17**: Fixed import paths and project structure  
- **2025-01-17**: Configured production build with static file serving
- **2025-01-17**: Added production script for Docker deployment
- **2025-01-17**: Fixed broken import paths in gothic-home.tsx and use-real-time-updates.ts
- **2025-01-17**: Removed Next.js "use client" directives from shadcn/ui components
- **2025-01-17**: Enhanced Docker configuration with optimized nginx and Node.js Alpine images
- **2025-01-17**: Added comprehensive deployment scripts for production styling fixes
- **2025-01-17**: Fixed CSS issues with Tailwind classes for Docker production build
- **2025-01-17**: Added logo.svg support and integrated into gothic-home.tsx
- **2025-01-17**: Created fix-docker-all.sh script for complete Docker build fixes
- **2025-01-17**: Fixed Docker vite import error by including vite in production dependencies
- **2025-01-17**: Added hover animation for "посмотреть объявления" button with gothic glow effects

## Development Commands
- `npm run dev` - Development mode with hot reload
- `npm run build` - Build backend for production
- `cd client && npm run build` - Build frontend for production  
- `./run-prod.sh` - Run production build locally
- `docker-compose up` - Full production deployment

## Status
✅ Import issues fixed, application running successfully
✅ Docker configuration optimized for production deployment
✅ Styling issues addressed with comprehensive CSS configuration
✅ Production deployment scripts created and ready to use

## Production Deployment
- **VPS установка**: `sudo ./vps-install.sh` (устанавливает Docker и зависимости)
- **Быстрый запуск**: `./run-one-command.sh` (одна команда для всего)
- **Альтернативно**: `./deploy-production.sh` (основной скрипт)
- **Исправление стилей**: `./fix-styling-production.sh` (при необходимости)
- **Docker Compose**: `./docker-compose-start.sh` (альтернативный способ)
- Frontend served via nginx on port 80
- Backend API served via Node.js on port 5000

## Deployment Files
- `vps-install.sh` - Установка Docker и зависимостей на VPS
- `run-one-command.sh` - Запуск одной командой (рекомендуется)
- `deploy-production.sh` - Основной скрипт развертывания
- `fix-styling-production.sh` - Исправление стилей для продакшена
- `docker-compose-start.sh` - Запуск через Docker Compose
- `README-VPS.md` - Подробная инструкция по развертыванию
- `ЗАПУСК-НА-VPS.md` - Краткая инструкция на русском