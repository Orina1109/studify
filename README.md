# Studify Application

A full-stack application for managing student information, built with:
- Backend: Spring Boot REST API (Kotlin)
- Frontend: React with TypeScript

## Project Structure

### Backend (Spring Boot)

- `src/main/kotlin/org/studify/Application.kt` - Main application entry point
- `src/main/kotlin/org/studify/controller/` - REST controllers
- `src/main/kotlin/org/studify/model/` - Data models
- `src/main/kotlin/org/studify/service/` - Business logic services
- `src/main/kotlin/org/studify/security/` - Authentication and security

### Frontend (React)

- `frontend/src/main.tsx` - Frontend application entry point
- `frontend/src/App.tsx` - Main React component
- `frontend/src/components/` - React components
- `frontend/public/` - Static assets

## Getting Started

### Prerequisites

#### Backend
- JDK 21 or later
- Gradle 8.0 or later

#### Frontend
- Node.js 18 or later
- npm 9 or later

### Running the Application

#### Running Backend and Frontend Separately

##### Backend:

From the command line:
```bash
./gradlew bootRun
```

Or from an IDE:
Run the `main` function in `src/main/kotlin/org/studify/Application.kt`

The backend API will start on port 8080 by default.

##### Frontend:

From the command line:
```bash
cd frontend
npm install
npm run dev
```

The frontend development server will start on port 3000 by default.

#### Running with Docker Compose (Recommended)

The easiest way to run the complete application is using Docker Compose:

```bash
docker-compose up -d
```

This will start:
- Backend API on port 8080
- Frontend on port 80
- PostgreSQL database on port 5432

You can access the application at http://localhost

## API Endpoints

### Hello Endpoint

- `GET /api/hello` - Returns a simple greeting message

### Student Endpoints

- `GET /api/students` - Get all students
- `GET /api/students/{id}` - Get a student by ID
- `POST /api/students` - Create a new student
- `PUT /api/students/{id}` - Update a student
- `DELETE /api/students/{id}` - Delete a student

## Example Requests

### Create a Student

```bash
curl -X POST http://localhost:8080/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Alice",
    "lastName": "Johnson",
    "email": "alice.johnson@example.com",
    "birthDate": "2002-03-15"
  }'
```

### Get All Students

```bash
curl http://localhost:8080/api/students
```

## Configuration

The application can be configured through the `src/main/resources/application.properties` file.

Key configuration options:
- `server.port` - The port the server runs on (default: 8080)
- `spring.application.name` - The application name (default: studify-api)

## Development

### Building the Project

```bash
./gradlew build
```

### Running Tests

```bash
./gradlew test
```

## Docker

### Building and Running Individual Components

#### Backend API

```bash
# Build the backend Docker image
docker build -t studify-api .

# Run the backend container
docker run -p 8080:8080 studify-api
```

#### Frontend

```bash
# Build the frontend Docker image
cd frontend
docker build -t studify-frontend .

# Run the frontend container
docker run -p 80:80 studify-frontend
```

### Environment Variables

You can configure the backend application using environment variables:

```bash
docker run -p 8080:8080 \
  -e SPRING_PROFILES_ACTIVE=prod \
  -e SERVER_PORT=8080 \
  -e JWT_EXPIRATION=86400 \
  -e JWT_ISSUER=studify-api \
  -e ADMIN_REGISTRATION_TOKEN=your-secure-token \
  studify-api
```

### Docker Compose (Recommended)

The project includes a `docker-compose.yml` file that sets up the complete application stack:

```yaml
version: '3.8'
services:
  studify-api:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - SERVER_PORT=8080
      - JWT_EXPIRATION=86400
      - JWT_ISSUER=studify-api
      - ADMIN_REGISTRATION_TOKEN=admin-secret-token
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - studify-network

  studify-frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "80:80"
    depends_on:
      studify-api:
        condition: service_healthy
    networks:
      - studify-network

  postgres:
    image: postgres:16-alpine
    environment:
      - POSTGRES_DB=studify
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - studify-network
```

Run the complete application stack:

```bash
docker-compose up -d
```

This will start the backend API, frontend application, and PostgreSQL database in separate containers, all connected via a Docker network.
