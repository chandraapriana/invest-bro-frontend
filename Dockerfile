# Gunakan Node.js sebagai base image
FROM node:18-alpine AS builder

# Set work directory
WORKDIR /app

# Copy package.json dan package-lock.json (jika ada)
COPY package.json package-lock.json ./
ENV NODE_ENV=production

ARG NEXT_PUBLIC_ENDPOINT_URL
ENV NEXT_PUBLIC_ENDPOINT_URL=${NEXT_PUBLIC_ENDPOINT_URL}
RUN echo "value for NEXT_PUBLIC_ENDPOINT_URL: [${NEXT_PUBLIC_ENDPOINT_URL}]"

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy seluruh kode aplikasi
COPY . .

# Build aplikasi Next.js
RUN npm run build

# -----------------------------------
# Gunakan image yang lebih ringan untuk menjalankan aplikasi
FROM node:18-alpine AS runner

WORKDIR /app

# Copy hasil build dari stage builder
COPY --from=builder /app/.next .next
COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public

# Jalankan aplikasi Next.js
CMD ["npm", "run", "start"]
