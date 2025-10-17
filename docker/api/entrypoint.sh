#!/bin/sh
set -e

cd /var/www/html

# 1️⃣ Crear Laravel si no existe composer.json
if [ ! -f composer.json ]; then
    echo "⚙️ No se encontró composer.json. Creando proyecto Laravel en el volumen..."
    composer create-project laravel/laravel .
fi

# 2️⃣ Ajustar permisos
echo "🔧 Ajustando permisos..."
mkdir -p storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache

# 3️⃣ Instalar dependencias con Composer si no existe vendor
if [ ! -d vendor ]; then
    echo "📦 Instalando dependencias con Composer..."
    composer install --no-interaction --prefer-dist --optimize-autoloader
fi

# 4️⃣ Crear .env si no existe
if [ ! -f .env ]; then
    cp .env.example .env
fi

# 5️⃣ Generar APP_KEY si no existe
if ! php artisan key:generate --show | grep -q 'base64'; then
    php artisan key:generate
fi

# 6️⃣ Ejecutar comando por defecto
exec "$@"
