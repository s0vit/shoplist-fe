# Dockerfile
FROM node:20-alpine AS build
WORKDIR /app

COPY . .
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
RUN pnpm install && pnpm build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
