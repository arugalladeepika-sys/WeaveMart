# --------------------------------------------------------------
# Stage 1 – Build the Spring Boot JAR (including the embedded UI)
# --------------------------------------------------------------
FROM maven:3.9.6-eclipse-temurin-17 AS builder

# Set workdir inside the container
WORKDIR /app

# Copy only the backend pom.xml first (caches dependencies)
COPY backend/pom.xml .

# Download dependencies (no source code yet → layer cache)
RUN mvn dependency:go-offline -B

# Now copy the rest of the backend source
COPY backend/src ./src

# Build the jar (skip tests for speed)
RUN mvn -B -DskipTests clean package

# --------------------------------------------------------------
# Stage 2 – Runtime image (tiny Alpine JDK)
# --------------------------------------------------------------
FROM eclipse-temurin:17-jdk-alpine

# Vercel expects the process to listen on $PORT (already handled)
VOLUME /tmp

# Copy the built jar from the builder stage
COPY --from=builder /app/target/weavemart-backend-1.0.0.jar /app.jar

# Expose the port (optional – Vercel sets $PORT at runtime)
EXPOSE 8080

# Start the application
ENTRYPOINT ["java","-jar","/app.jar"]