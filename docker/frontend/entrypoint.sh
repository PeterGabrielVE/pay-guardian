#!/bin/sh
set -e
cd /app

# Instalar dependencias si faltan
if [ ! -d node_modules ]; then
  echo "📦 Instalando dependencias..."
  npm ci || npm install --force
fi

# Ejecutar el comando principal
exec "$@"
