# --- Imagen base: Node 20 slim ---
FROM node:20-slim AS runtime

# --- Directorio de trabajo ---
WORKDIR /app

# --- Copiar solo package.json y package-lock.json para instalar dependencias ---
COPY frontend/package*.json ./

# --- Limpiar dependencias previas e instalar todas incluyendo opcionales ---
RUN rm -rf node_modules package-lock.json || true
RUN npm install --include=optional

# --- Instalar bash y utilidades necesarias para scripts ---
RUN apt-get update && \
    apt-get install -y bash curl && \
    rm -rf /var/lib/apt/lists/*

# --- Copiar el resto del código fuente ---
COPY frontend/ ./

# --- Copiar entrypoint y dar permisos ---
COPY ./docker/frontend/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# --- Exponer puerto de desarrollo (Vite/React dev server) ---
EXPOSE 5173

# --- Montar código fuente para hot reload durante desarrollo ---
VOLUME ["/app"]

# --- Entrypoint personalizado ---
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

# --- Comando por defecto ---
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
