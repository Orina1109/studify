# Build stage
FROM gradle:8.5-jdk21 AS build

WORKDIR /app
COPY . /app/
RUN gradle build --no-daemon

# Runtime stage
FROM eclipse-temurin:21-jre

WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar

# Install netcat for health checks
RUN apt-get update && apt-get install -y --no-install-recommends netcat-openbsd && \
    rm -rf /var/lib/apt/lists/*

# Create a non-root user to run the application
RUN addgroup --system --gid 1001 appuser && \
    adduser --system --uid 1001 --gid 1001 --no-create-home appuser
USER appuser

# Configure environment variables (can be overridden at runtime)
ENV SPRING_PROFILES_ACTIVE=prod
ENV SERVER_PORT=8080

# Expose the application port
EXPOSE 8080

# Health check - simple TCP connection check since actuator is not available
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 \
  CMD nc -z localhost 8080 || exit 1

# Run the application with JVM optimizations for containers
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]
