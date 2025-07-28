# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GreenGrows API is a Node.js Express server that tracks CO2 consumption data from a Chrome extension. The project consists of:

- **Main API server** (`server.js`): Express application with CO2 data collection and statistics endpoints
- **Backoffice dashboard** (`backoffice/`): Web-based visualization dashboard with Chart.js for real-time CO2 statistics

## Development Commands

```bash
# Install dependencies
npm install

# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Start backoffice dashboard (run from backoffice/ directory)
cd backoffice
npx http-server -p 8080 --cors
```

## Architecture

### API Server (`server.js`)
- **Port**: 3001 on host `141.95.160.10` (VPS configuration)
- **In-memory storage**: Uses simple variables `totalCO2` and `details` object for data persistence
- **CORS**: Configured with `origin: '*'` for Chrome extension compatibility
- **Logging**: Custom `debugLog()` function with emoji icons and formatted output

### API Endpoints
- `POST /api/co2`: Accepts `{type: string, co2: number}` to record CO2 consumption
- `GET /api/stats`: Returns aggregated statistics with total and breakdown by type

### Data Validation
- CO2 values must be numbers and are rounded to 3 decimal places
- Required fields validation with descriptive error messages
- Comprehensive error handling with detailed logging

### Backoffice Dashboard
- **Location**: `backoffice/` directory with `index.html`, `backoffice.js`, `backoffice.css`
- **Dependencies**: Chart.js for data visualization, Material Icons, Google Fonts
- **API Integration**: Connects to API server at configured baseUrl
- **Auto-refresh**: Updates data every 5 seconds

## Chrome Extension Integration

The API is designed to work with a Chrome extension that sends CO2 consumption data. The extension should:
- Use `127.0.0.1:3001` rather than `localhost` for better Chrome compatibility
- Include proper CORS permissions in manifest.json
- Send data in format: `{type: "webpage", co2: 0.234}`

## Configuration Notes

- Server uses CommonJS modules (`"type": "commonjs"`)
- Node.js version requirement: >= 18.0.0
- No database - all data stored in memory and lost on restart
- Logging is verbose with emoji formatting for debugging
- CORS allows all origins for development convenience