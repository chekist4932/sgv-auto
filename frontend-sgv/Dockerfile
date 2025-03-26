# # Use the latest LTS version of Node.js
# FROM node:20-alpine
 
# # Set the working directory inside the container
# WORKDIR /app
 
# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install
 
# # Copy the rest of your application files
# COPY . .
 
# # Expose the port your app runs on
# EXPOSE 8080
 
# # Define the command to run your app
# CMD ["npm", "run", "dev"]


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
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]