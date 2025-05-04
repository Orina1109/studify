# Studify REST API

A Spring Boot REST API for managing student information, built with Kotlin.

## Project Structure

- `src/main/kotlin/org/studify/Application.kt` - Main application entry point
- `src/main/kotlin/org/studify/controller/` - REST controllers
- `src/main/kotlin/org/studify/model/` - Data models
- `src/main/kotlin/org/studify/service/` - Business logic services

## Getting Started

### Prerequisites

- JDK 21 or later
- Gradle 8.0 or later

### Running the Application

#### From the command line:

```bash
./gradlew bootRun
```

#### From an IDE:

Run the `main` function in `src/main/kotlin/org/studify/Application.kt`

The application will start on port 8080 by default.

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