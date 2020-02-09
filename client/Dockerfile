# Stage 1
FROM node:8.11.2-alpine as node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i yarn@latest -g

RUN yarn

COPY . .

RUN yarn build

# Stage 2
FROM nginx:1.13.12-alpine

COPY --from=node /usr/src/app/build /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/nginx.vh.default.conf /etc/nginx/conf.d/default.conf
