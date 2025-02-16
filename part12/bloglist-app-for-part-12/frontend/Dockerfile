# Build stage
FROM node:20 AS build-stage
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ENV VITE_BACKEND_URL=/api
RUN npm run build

# Test stage
FROM node:20 AS test-stage
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run cypress:run || exit 1

# Production stage
FROM nginx:alpine
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]