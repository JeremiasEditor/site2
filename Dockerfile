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
ENV PORT=3000

# Start
CMD ["node_modules/.bin/next", "start", "-p", "3000"]
