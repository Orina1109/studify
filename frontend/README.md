# Studify Frontend

This is the frontend application for the Studify project. It's built with React, TypeScript, and Vite.

## Development

### Prerequisites

- Node.js 18+ and npm

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at http://localhost:3000.

## Building for Production

To build the application for production:

```bash
npm run build
```

This will create a `dist` directory with the compiled assets.

## Docker

The frontend is containerized and can be run with Docker:

```bash
docker build -t studify-frontend .
docker run -p 80:80 studify-frontend
```

## Docker Compose

The recommended way to run the complete application (frontend and backend) is using Docker Compose from the root directory:

```bash
docker-compose up -d
```

This will start both the frontend and backend services.