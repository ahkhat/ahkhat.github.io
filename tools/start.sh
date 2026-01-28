#!/bin/bash

# Navigate to project root (parent directory of tools/)
cd "$(dirname "$0")/.."

echo "========================================"
echo "  Asena Hazal Portfolio - Server"
echo "========================================"
echo ""

# Check for Python
if command -v python3 &> /dev/null; then
    echo "[OK] Python found!"
    echo "[*] Starting HTTP Server..."
    echo "[*] Open http://localhost:8000 in your browser"
    echo ""
    echo "[!] Press Ctrl+C to stop"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "[OK] Python found!"
    echo "[*] Starting HTTP Server..."
    echo "[*] Open http://localhost:8000 in your browser"
    echo ""
    echo "[!] Press Ctrl+C to stop"
    echo ""
    python -m http.server 8000
elif command -v node &> /dev/null; then
    echo "[!] Python not found, trying Node.js..."
    npx http-server -p 8000
else
    echo "[ERROR] Python or Node.js not found!"
    echo ""
    echo "Please install one of the following:"
    echo "1. Python: https://www.python.org/downloads/"
    echo "2. Node.js: https://nodejs.org/"
    echo ""
    exit 1
fi
