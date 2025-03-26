# Build Stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG VITE_APP_API_URL
RUN npm run build
 
# Production Stage
FROM nginx:stable-alpine AS production
COPY --from=build /app/dist  /usr/share/nginx/html
# Копируем конфиг Nginx (если нужно изменить настройки)
COPY nginx.conf /etc/nginx/conf.d/default.conf
ARG VITE_APP_PORT
EXPOSE ${VITE_APP_PORT}
CMD ["nginx", "-g", "daemon off;"]