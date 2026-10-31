#!/bin/bash
set -e

echo "=================================================="
echo "Building WeaveMart Full-Stack Deployment Package"
echo "=================================================="

echo "1. Building React Frontend..."
cd frontend
npm install
npm run build
cd ..

echo "2. Syncing Frontend to Spring Boot Static Assets..."
mkdir -p backend/src/main/resources/static
cp -r frontend/dist/* backend/src/main/resources/static/

echo "3. Building Spring Boot Executable JAR..."
cd backend
mvn clean package -DskipTests
cd ..

echo "=================================================="
echo "Build Complete!"
echo "Run the unified app with: java -jar backend/target/weavemart-backend-1.0.0.jar"
echo "Access at: http://localhost:8080"
echo "=================================================="
