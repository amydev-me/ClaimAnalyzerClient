# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files from correct location
COPY react-app/package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY react-app/ ./

# Build the app
RUN npm run build

# Debug: List what was built
RUN ls -la build/

# Production stage
FROM nginx:alpine

# Copy built app
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Debug: Check what was copied
RUN ls -la /usr/share/nginx/html/

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]