FROM node:20-alpine AS runtime
WORKDIR /app

# Copiar todo el código local
COPY . .

# Copiar entrypoint
COPY ./docker/frontend/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Reflejar cambios en host
VOLUME ["/app"]

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

CMD ["npm", "run", "dev"]
