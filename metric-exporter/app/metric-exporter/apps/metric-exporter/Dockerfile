# Path: apps/metric-exporter/.dockerignore
FROM node:18 as builder
WORKDIR /app
COPY package-lock.json package.json ./
RUN npm install
COPY . .
RUN "npm run build"



FROM node:18-alpine as runner 
WORKDIR /app
COPY package-lock.json package.json ./
RUN npm install --production
COPY --from=builder /app/dist/metric-exporter .

CMD ["node", "index.js"]
