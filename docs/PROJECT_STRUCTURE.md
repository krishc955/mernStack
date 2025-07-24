# 🏗️ Project Structure Guide

## Overview
This document describes the organized file structure and development practices for the Vinora e-commerce application.

## 📁 Directory Structure

```
mern-ecommerce-2024-master/
├── 📚 docs/                    # All documentation files
├── 🔧 scripts/                 # Build and deployment scripts
├── 🛠️ tools/                   # Development tools and utilities
├── 🖥️ client/                  # Frontend React application
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── 🎨 assets/          # Images, icons, static files
│   │   ├── 🧩 components/      # Reusable UI components
│   │   │   ├── admin-view/     # Admin-specific components
│   │   │   ├── auth/           # Authentication components
│   │   │   ├── common/         # Shared components
│   │   │   ├── shopping-view/  # Shopping-specific components
│   │   │   └── ui/             # Base UI components
│   │   ├── ⚙️ config/          # Configuration files
│   │   ├── 📄 constants/       # Application constants
│   │   ├── 🎣 hooks/           # Custom React hooks
│   │   ├── 🏗️ layouts/         # Layout components
│   │   ├── 🔄 lib/             # Utility libraries
│   │   ├── 📱 pages/           # Page components
│   │   ├── 🌐 services/        # API services
│   │   ├── 🗄️ store/           # Redux store configuration
│   │   ├── 🎨 styles/          # CSS and styling files
│   │   └── 🛠️ utils/           # Utility functions
│   ├── index.html              # Main HTML template
│   ├── vite.config.js          # Vite configuration
│   └── package.json            # Dependencies and scripts
└── 🖥️ server/                  # Backend Node.js application
    ├── controllers/            # Route controllers
    ├── helpers/                # Helper functions
    ├── models/                 # Database models
    ├── routes/                 # API routes
    ├── server.js               # Main server file
    └── package.json            # Dependencies and scripts
```

## 🎯 Key Principles

### 1. **Environment-Aware Development**
- **Development**: Enhanced debugging, logging, and development tools
- **Production**: Optimized builds, minification, and performance monitoring
- **Configuration**: Centralized in `src/config/environment.js`

### 2. **Component Organization**
- **Base Components**: In `src/components/ui/` for maximum reusability
- **Feature Components**: Organized by feature area (admin, auth, shopping)
- **Layout Components**: In `src/layouts/` for page structure
- **Page Components**: In `src/pages/` for route-specific content

### 3. **Styling Architecture**
- **Global Styles**: `src/styles/globals.css` for base styles and CSS variables
- **Component Styles**: Tailwind CSS classes with organized utility classes
- **Development Styles**: `src/styles/development.css` for debugging tools
- **CSS Variables**: Centralized color scheme and design tokens

### 4. **State Management**
- **Redux Store**: Centralized in `src/store/`
- **Custom Hooks**: In `src/hooks/` for reusable logic
- **Local Storage**: Managed through custom hooks with error handling

### 5. **API Integration**
- **Service Layer**: `src/services/apiService.js` for centralized API calls
- **Environment Config**: Different endpoints for dev/prod
- **Error Handling**: Consistent error messages and retry logic

## 🔧 Development Features

### Environment-Specific Features
- **Debug Tools**: Visual indicators, performance monitoring
- **Logging**: Comprehensive logging in development mode
- **Error Boundaries**: Enhanced error handling with fallbacks
- **Hot Reloading**: Fast refresh for development efficiency

### Performance Optimizations
- **Code Splitting**: Lazy loading with React.lazy()
- **Chunk Optimization**: Organized vendor and feature chunks
- **Asset Optimization**: Image lazy loading and compression
- **Service Worker**: Caching for production builds

## 📝 File Naming Conventions

### Components
- **PascalCase**: `ProductCard.jsx`, `UserProfile.jsx`
- **Descriptive**: Names should clearly indicate component purpose
- **Organized**: Group related components in subdirectories

### Hooks
- **camelCase**: `useEnvironment.js`, `useLocalStorage.js`
- **Prefix**: All custom hooks start with "use"
- **Descriptive**: Clear indication of hook functionality

### Constants
- **UPPER_SNAKE_CASE**: `API_CONSTANTS`, `COLOR_SCHEME`
- **Organized**: Grouped by functionality in single file
- **Exported**: All constants exported from central index

### Styles
- **kebab-case**: `globals.css`, `components.css`
- **Organized**: Separate files for different concerns
- **Modular**: Import structure for maintainability

## 🚀 Getting Started

### Development Setup
1. **Install Dependencies**: `npm install` in both client and server directories
2. **Environment**: Copy `.env.example` to `.env` and configure
3. **Start Development**: Use the provided VS Code tasks or npm scripts
4. **Debug Tools**: Enable development features in environment config

### Production Build
1. **Build Client**: `npm run build` in client directory
2. **Environment**: Set production environment variables
3. **Deploy**: Use provided deployment scripts in `scripts/` directory
4. **Monitor**: Enable production monitoring features

## 🎨 Styling Guidelines

### Color Scheme
- **Primary**: Beige and brown tones for brand consistency
- **Status**: Green (success), red (error), yellow (warning), blue (info)
- **Neutral**: Gray scale for text and backgrounds

### Component Classes
- **Utility First**: Use Tailwind CSS utility classes
- **Component Classes**: Create reusable component classes when needed
- **Responsive**: Mobile-first responsive design approach

## 🧪 Testing Strategy

### Component Testing
- **Unit Tests**: Test individual components in isolation
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test complete user flows

### Performance Testing
- **Bundle Analysis**: Monitor chunk sizes and dependencies
- **Loading Performance**: Measure page load times
- **Runtime Performance**: Monitor React component performance

## 📦 Deployment

### Environments
- **Development**: Local development with hot reloading
- **Staging**: Production-like environment for testing
- **Production**: Optimized build with performance monitoring

### Build Optimization
- **Code Splitting**: Automatic chunk splitting by route and vendor
- **Asset Optimization**: Image compression and lazy loading
- **Caching**: Service worker for offline functionality
- **Minification**: Code and asset minification for production

## 🔍 Monitoring and Debugging

### Development Tools
- **React DevTools**: Component inspection and profiling
- **Redux DevTools**: State management debugging
- **Performance Indicators**: Visual performance metrics
- **Console Logging**: Organized logging with different levels

### Production Monitoring
- **Error Tracking**: Centralized error reporting
- **Performance Metrics**: Real user monitoring
- **Analytics**: User behavior and conversion tracking
- **Health Checks**: Server and application monitoring

---

## 🤝 Contributing

### Code Style
- **Consistent**: Follow established patterns and conventions
- **Documented**: Add comments for complex logic
- **Tested**: Include tests for new features
- **Reviewed**: All changes go through code review

### Git Workflow
- **Feature Branches**: Create branches for new features
- **Commit Messages**: Descriptive commit messages
- **Pull Requests**: Detailed PR descriptions with testing info

This structure ensures maintainability, scalability, and developer productivity while maintaining high performance standards.
