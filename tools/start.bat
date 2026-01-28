@echo off
REM Navigate to project root (parent directory of tools/)
cd /d "%~dp0\.."

echo ========================================
echo   Asena Hazal Portfolio - Server
echo ========================================
echo.

REM Check for Python 3
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] Python found!
    echo [*] Starting HTTP Server...
    echo [*] Open http://localhost:8000 in your browser
    echo.
    echo [!] Press Ctrl+C to stop
    echo.
    python -m http.server 8000
    goto :end
)

REM Check for Node.js
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo [!] Python not found, trying Node.js...
    npx http-server -p 8000
    goto :end
)

echo [ERROR] Python or Node.js not found!
echo.
echo Please install one of the following:
echo 1. Python: https://www.python.org/downloads/
echo 2. Node.js: https://nodejs.org/
echo.
pause

:end
