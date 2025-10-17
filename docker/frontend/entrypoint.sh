#!/bin/sh
set -e
cd /app

# Crear Remix si no hay package.json
if [ ! -f package.json ]; then
  echo "🚀 Creando proyecto Remix..."
  npx create-remix@latest .
fi

# Instalar dependencias si no existe node_modules
if [ ! -d node_modules ]; then
  echo "📦 Instalando dependencias..."
  npm install
fi

exec "$@"
