FROM php:8.2-fpm-alpine

# Instalar herramientas necesarias
RUN apk add --no-cache bash git zip unzip libzip-dev oniguruma-dev libpng-dev libxml2-dev \
    autoconf make g++ linux-headers curl

# Instalar extensiones PHP + MongoDB
RUN docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl bcmath \
    && pecl install mongodb \
    && docker-php-ext-enable mongodb

# Instalar Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Directorio de trabajo
WORKDIR /var/www/html

# Copiar entrypoint
COPY ./docker/core/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh


# Exponer puerto
EXPOSE 8000

# ENTRYPOINT + CMD
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]