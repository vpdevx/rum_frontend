FROM node:22-alpine3.19 AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.27.1-alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
