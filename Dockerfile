FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
# Копируем собранные файлы из стадии builder
COPY --from=builder /app/dist /usr/share/nginx/html
# Копируем папку img
COPY img /usr/share/nginx/html/img
# Копируем конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]