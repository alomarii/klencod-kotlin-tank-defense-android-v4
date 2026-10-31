@echo off
where gradle >nul 2>nul && (gradle %* & exit /b %errorlevel%)
echo Install Gradle 8.9 or open the project in Android Studio.
exit /b 1
