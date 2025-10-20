#!/bin/bash
set -e
cd /app

# Instalar dependencias si no existen
if [ ! -d node_modules ]; then
  echo "📦 Instalando dependencias..."
  npm ci || npm install --force
fi

echo "🚀 Ejecutando comando: $@"
exec "$@"
