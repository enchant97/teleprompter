FROM oven/bun:1 AS base

    WORKDIR /usr/src/app

    COPY package.json bun.lockb ./

    RUN bun install --frozen-lockfile

FROM base AS builder

    WORKDIR /usr/src/app

    ENV NODE_ENV=production
    ENV SERVER_PRESET=node-server

    COPY --from=base /usr/src/app/node_modules node_modules

    COPY . .

    RUN bun run build

FROM node:22-slim

    WORKDIR /usr/src/app
    EXPOSE 3000

    COPY --from=builder /usr/src/app/.output ./

    CMD [ "node", "./server/index.mjs" ]
