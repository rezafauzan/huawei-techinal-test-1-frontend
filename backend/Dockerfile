FROM node:24-alpine AS deps

WORKDIR /app

COPY package*.json ./
RUN npm ci

FROM node:24-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

FROM node:24-alpine AS runner

WORKDIR /app

ENV APP_ENV=production
ENV DEBUG=true
ENV PORT=8888
ENV FRONTEND_URL=*

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app ./

EXPOSE 8888

CMD ["npm", "run", "start"]
