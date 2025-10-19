FROM node:20-slim AS runtime

WORKDIR /app

# Copiar package.json y package-lock.json primero
COPY ../frontend/package.json ../frontend/package-lock.json* ./

# Limpiamos cualquier instalación previa (por si acaso)
RUN rm -rf node_modules package-lock.json

# Instalar dependencias (omit opcionales)
# Forzar instalación de dependencias opcionales
ENV npm_config_optional=true
RUN npm install

# Copiar resto del código
COPY ../frontend ./

# Copiar entrypoint
COPY ./docker/frontend/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

VOLUME ["/app"]

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

CMD ["npm", "run", "dev"]
