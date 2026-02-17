# Build Stage
FROM node:20-alpine@sha256:8bda036ddd59ea51a23bc1a1035d3b5c614e72c01366d989f4120e8adca196d4 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG VITE_APP_API_URL
RUN npm run build
 
# Production Stage
FROM nginx:stable-alpine3.20@sha256:d2c11a1e63f200585d8225996fd666436277a54e8c0ba728fa9afff28f075bd7 AS production
COPY --from=build /app/dist  /usr/share/nginx/html
# Копируем конфиг Nginx (если нужно изменить настройки)
COPY nginx.conf /etc/nginx/conf.d/default.conf
ARG VITE_APP_PORT
EXPOSE ${VITE_APP_PORT}
CMD ["nginx", "-g", "daemon off;"]