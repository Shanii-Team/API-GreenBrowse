# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GreenGrows API is a Node.js Express server that tracks CO2 consumption data from a Chrome extension. The project consists of:

- **Main API server** (`server.js`): Express application with CO2 data collection and statistics endpoints
- **Backoffice dashboard** (`backoffice/`): Web-based visualization dashboard with Chart.js for real-time CO2 statistics

## Development Commands

```bash
# Install dependencies (root and backoffice)
npm install
cd backoffice && npm install && cd ..

# Start API server only
npm start

# Start API server with auto-reload
npm run dev

# Start backoffice development server only
npm run backoffice:dev

# Start both API and backoffice together
npm run dev:all

# Build backoffice for production
npm run backoffice:build

# Serve built backoffice
npm run backoffice:serve
```

## Architecture

### API Server (`server.js`)
- **Port**: 3001 on host `141.95.160.10` (VPS configuration)
- **In-memory storage**: Uses simple variables `totalCO2` and `details` object for data persistence
- **CORS**: Configured with `origin: '*'` for Chrome extension and Flutter app compatibility
- **Logging**: Custom `debugLog()` function with emoji icons and formatted output

### API Endpoints

#### Core Endpoints
- `GET /api/health`: Health check endpoint for connection testing
- `POST /api/co2`: Accepts `{type: string, co2: number, userId?: string, deviceInfo?: any}` to record CO2 consumption
- `GET /api/stats`: Returns aggregated statistics with total and breakdown by type

#### Multi-User Endpoints
- `GET /api/users`: Get list of all users with their statistics
- `GET /api/users/:userId/stats`: Get detailed statistics for a specific user
- `PUT /api/users/:userId/profile`: Update user profile (name, deviceInfo)
- `DELETE /api/users/:userId`: Delete a user and their data

### Data Validation
- CO2 values must be numbers and are rounded to 3 decimal places
- Required fields validation with descriptive error messages
- Comprehensive error handling with detailed logging

### Backoffice Dashboard
- **Framework**: React + TypeScript with Vite build system
- **Location**: `backoffice/` directory with modern React components
- **Dependencies**: Lucide React icons, Tailwind CSS for styling
- **API Integration**: Real-time connection to API server via custom hooks
- **Auto-refresh**: Updates data every 5 seconds with connection status monitoring
- **Features**: 
  - Real-time CO2 data visualization
  - Multi-user management and monitoring
  - Connection status monitoring
  - Detailed breakdown by data type and user
  - User profile management (create, update, delete)
  - Responsive design with dark/light mode
  - Multi-language support

## Integration with Client Applications

### Chrome Extension Integration
The API is designed to work with a Chrome extension that sends CO2 consumption data. The extension should:
- Use `141.95.160.10:3001` for production VPS deployment
- Include proper CORS permissions in manifest.json
- Send data in format: `{type: "webpage", co2: 0.234, userId?: "user123", deviceInfo?: {...}}`
- Include a unique userId to enable per-user tracking

### Flutter App Integration
The API supports Flutter applications with:
- Extended CORS configuration for Flutter HTTP requests
- Health check endpoint for connection testing
- JSON response format compatible with Dart/Flutter HTTP client
- Real-time data synchronization support
- Multi-user support with user identification
- Device information tracking for better analytics

## Configuration Notes

- Server uses CommonJS modules (`"type": "commonjs"`)
- Node.js version requirement: >= 18.0.0
- No database - all data stored in memory and lost on restart
- Logging is verbose with emoji formatting for debugging
- CORS allows all origins for development convenience