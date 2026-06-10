FROM node:24.13.0-alpine AS builder

WORKDIR /workspace
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.28.2-alpine

# WORKDIR /usr/share/nginx/html

COPY --from=builder /workspace/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY ./default.conf /etc/nginx/conf.d/default.conf