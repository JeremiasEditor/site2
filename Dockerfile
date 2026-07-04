# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files  
COPY package*.json ./

# Install all dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the Next.js app (generates .next folder, NOT /out)
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install curl for healthchecks
RUN apk add --no-cache curl

# Copy package files
COPY package*.json ./

# Install all dependencies (keep dev deps for now)
RUN npm ci

# Copy built app from builder (.next folder)
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/middleware.ts ./

# Create data directory if it doesn't exist
RUN mkdir -p /app/data

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:${PORT:-3000} || exit 1

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Start the app with correct port
CMD ["sh", "-c", "next start -p ${PORT:-3000}"]
