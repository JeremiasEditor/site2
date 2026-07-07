# Dockerfile minimalista para debug
FROM node:18-alpine

WORKDIR /app

# Copy tudo
COPY . .

# Install e build
RUN npm ci
RUN npm run build

# Definir port
ENV NODE_ENV=production
CMD ["sh", "-c", "node_modules/.bin/next start -p ${PORT:-3000}"]
