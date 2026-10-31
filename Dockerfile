# ==========================================
# Multi-Stage Dockerfile for WeaveMart
# Builds React Frontend + Spring Boot Backend
# into a single self-contained production container
# ==========================================

# Stage 1: Build React Frontend
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build Spring Boot Backend with embedded Frontend static files
FROM maven:3.9-eclipse-temurin-17 AS backend-build
WORKDIR /app
COPY backend/pom.xml backend/
COPY backend/src backend/src
# Copy built frontend assets to Spring Boot static resources
COPY --from=frontend-build /app/frontend/dist backend/src/main/resources/static
WORKDIR /app/backend
RUN mvn clean package -DskipTests

# Stage 3: Minimal Production Runtime
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Create persistent directories for SQLite/H2 data and uploaded files
RUN mkdir -p /app/data /app/uploads

COPY --from=backend-build /app/backend/target/weavemart-backend-1.0.0.jar app.jar

ENV PORT=8080
ENV SPRING_DATASOURCE_URL=jdbc:h2:file:/app/data/weavemartdb;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
