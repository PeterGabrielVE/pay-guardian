#!/bin/sh
set -e

cd /var/www/html

# Crear Laravel si no existe composer.json (volumen vacío)
if [ ! -f composer.json ]; then
    echo "⚙️ No se encontró composer.json. Creando proyecto Laravel en el volumen..."
    composer create-project laravel/laravel .
fi

# Ajustar permisos de storage y bootstrap/cache
echo "🔧 Ajustando permisos..."
mkdir -p storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache

# 3️⃣ Instalar dependencias si no existe vendor
if [ ! -d vendor ]; then
    echo "📦 Instalando dependencias con Composer..."
    composer install --no-interaction --prefer-dist --optimize-autoloader
else
    echo "📦 Vendor ya existe, verificando actualizaciones..."
    composer install --no-interaction --prefer-dist --optimize-autoloader
fi

# Crear .env si no existe
if [ ! -f .env ]; then
    echo "⚡ Creando archivo .env..."
    cp .env.example .env
fi

# Generar APP_KEY si no existe
if ! php artisan key:generate --show | grep -q 'base64'; then
    php artisan key:generate
fi

exec "$@"
