@echo off
echo ==================================================
echo Building WeaveMart Full-Stack Deployment Package
echo ==================================================

echo 1. Building React Frontend...
cd frontend
call npm install
call npm run build
cd ..

echo 2. Syncing Frontend to Spring Boot Static Assets...
if not exist "backend\src\main\resources\static" mkdir "backend\src\main\resources\static"
xcopy /E /I /Y "frontend\dist\*" "backend\src\main\resources\static\"

echo 3. Building Spring Boot Executable JAR...
cd backend
call mvn clean package -DskipTests
cd ..

echo ==================================================
echo Build Complete!
echo Run the unified app with:
echo java -jar backend\target\weavemart-backend-1.0.0.jar
echo Access at: http://localhost:8080
echo ==================================================
