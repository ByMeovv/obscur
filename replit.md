# Obscur Clothes - Gothic Streetwear Store

## Project Overview
A premium gothic streetwear clothing store website featuring Rick Owens, Balenciaga and other high-end brands. Built with React frontend and Express backend, now successfully migrated to Replit with spectacular rainbow animations and colorful effects.

## Architecture
- **Frontend**: React 18 with TypeScript, shadcn/ui components, Tailwind CSS
- **Backend**: Express.js with TypeScript serving API routes
- **Development**: Vite with hot reload for seamless development experience
- **Deployment**: Optimized for Replit hosting with proper client/server separation

## Tech Stack
- **Frontend Framework**: React 18 + TypeScript
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS with custom rainbow animations
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state
- **Icons**: Lucide React
- **Animations**: Custom CSS keyframes with rainbow effects
- **Build Tool**: Vite
- **Backend**: Express.js with TypeScript

## Key Features
- 🌈 **Spectacular Animations**: Rainbow fire background with colorful particle effects
- 🎨 **Dynamic Color Schemes**: Vibrant gradient texts and animated buttons
- 🔥 **Gothic Fire Background**: Canvas-based particle system with rainbow colors
- 📱 **Responsive Design**: Mobile-first approach with smooth animations
- ⚡ **Real-time Updates**: Live statistics and product listings
- 🛍️ **Product Showcase**: Horizontal carousel with animated cards
- 📊 **Statistics Dashboard**: Real-time metrics with colorful indicators

## User Preferences
- **Language**: Russian interface for target market
- **Design**: Minimalist luxury with purple, gray, and white colors + spectacular interactive animations
- **Deployment**: Docker-based deployment on VPS with SSL certificates
- **Performance**: Smooth animations with hardware acceleration
- **Mobile**: Touch-friendly interface with responsive design

## Recent Changes
- **2025-07-23**: Successfully migrated from Docker to Replit environment - resolved "container obscur_backend is unhealthy" issue
- **2025-07-23**: Fixed React imports and TypeScript configuration
- **2025-07-23**: Redesigned to "Minimalist Luxury" concept with purple, gray, and white colors
- **2025-07-23**: Implemented minimalist animation system:
  - Removed all distracting effects and complex animations
  - Added subtle polyprozchannye card hover effects
  - Created smooth scroll-reveal animations for elements
  - Implemented soft carousel animations for product cards
  - All text remains fully readable, effects are barely noticeable but beautiful when examined
- **2025-07-23**: Fixed Docker deployment issues:
  - Updated Dockerfile to properly handle package.json/package-lock.json conflicts
  - Created fixed deployment script (docker-start-fixed.sh) that removes lock files
  - Updated .dockerignore to exclude problematic files
  - Removed version field from docker-compose.yml (obsolete warning)
- **2025-07-23**: Optimized for both Replit development and Docker production deployment

## Development Commands
### Replit Development
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build backend for production
- `npm run start` - Start production server
- `npm run check` - Type checking with TypeScript

### Docker Deployment
- `chmod +x docker-start.sh && ./docker-start.sh` - One-command Docker setup
- `docker-compose up --build` - Build and start containers
- `docker-compose down` - Stop all containers
- `docker-compose logs` - View application logs

## Project Structure
```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/ui/  # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility libraries
│   │   └── data/          # Mock data and types
│   ├── index.html         # HTML template
│   └── vite.config.ts     # Vite configuration
├── server/                # Backend Express application
│   ├── index.ts          # Main server file
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Data storage interface
│   └── vite.ts           # Vite development setup
├── shared/               # Shared types and schemas
└── assets/              # Static assets (logo, etc.)
```

## Animation Classes
- `.gentle-float` - Subtle 4-second floating animation
- `.fade-in` - Smooth fade-in from bottom
- `.interactive-text` - Text with hover glow effects
- `.interactive-icon` - Icons with scale and rotation on hover
- `.interactive-link` - Links with animated underlines
- `.glow-chase` - Rotating glow effect around elements
- `.border-glow` - Chasing light animation around borders
- `.particle-burst` - Particle explosion effects on hover
- `.minimalist-card` - Glass-morphism card with subtle interactions
- `.primary-button` - Elegant gradient button with lift effect
- `.secondary-button` - Subtle glass-style secondary button

## Status
✅ Migration completed successfully - all Docker dependencies removed
✅ React imports fixed and TypeScript properly configured
✅ Spectacular rainbow animations implemented throughout
✅ Hot reload working perfectly for development
✅ All components enhanced with colorful effects
✅ Project ready for Replit deployment
✅ Client/server separation properly implemented

## Performance Optimizations
- Hardware-accelerated CSS animations
- Efficient particle system for fire background
- Optimized gradient animations with GPU acceleration
- Lazy loading for images
- Responsive design for all screen sizes

## Security Features
- Proper client/server separation
- No hardcoded secrets or credentials
- Safe external link handling
- Input validation with Zod schemas