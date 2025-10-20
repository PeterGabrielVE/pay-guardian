#!/bin/sh
set -e

cd /var/www/html

# 1️⃣ Ajustar permisos
echo "🔧 Ajustando permisos..."
mkdir -p storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache

# 2️⃣ Instalar dependencias con Composer si no existe vendor
if [ ! -d vendor ]; then
    echo "📦 Instalando dependencias con Composer..."
    composer install --no-interaction --prefer-dist --optimize-autoloader
fi

# 3️⃣ Crear .env si no existe
if [ ! -f .env ]; then
    cp .env.example .env
fi

# 4️⃣ Generar APP_KEY si no existe
if ! php artisan key:generate --show | grep -q 'base64'; then
    php artisan key:generate
fi

# 5️⃣ Ejecutar comando por defecto (artisan serve)
exec "$@"
