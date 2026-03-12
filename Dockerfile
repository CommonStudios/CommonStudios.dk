FROM node:22.14-alpine AS builder
WORKDIR /app

COPY package.json ./
RUN npm install --no-audit --no-fund

COPY . .
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx-gzip.conf /etc/nginx/conf.d/zz-gzip.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
