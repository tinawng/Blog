FROM oven/bun:alpine AS build
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production
COPY . ./
RUN bun --bun run generate

FROM tinawng/nginx-static-compressed:latest AS release
COPY --from=build /app/.output/public /static