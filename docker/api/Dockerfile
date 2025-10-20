FROM php:8.2-fpm-alpine

# Instalar herramientas necesarias
RUN apk add --no-cache bash git zip unzip libzip-dev oniguruma-dev libpng-dev libxml2-dev \
    autoconf make g++ linux-headers curl

# Instalar extensiones PHP + MongoDB (si lo necesitas)
RUN docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl bcmath \
    && pecl install mongodb \
    && docker-php-ext-enable mongodb

# Instalar Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Establecer directorio de trabajo
WORKDIR /var/www/html

# 📌 Copiar archivos de la app (incluyendo composer.json y composer.lock)
COPY ./wallet-api /var/www/html

# Instalar dependencias de Laravel
RUN composer install --no-dev --optimize-autoloader

# Copiar entrypoint
COPY ./docker/api/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Ajustar permisos iniciales
RUN mkdir -p storage bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache

EXPOSE 8000

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
