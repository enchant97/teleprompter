FROM oven/bun:1.3 AS base

    WORKDIR /usr/src/teleprompter

    COPY package.json bun.lockb ./

    RUN bun install --frozen-lockfile

FROM base AS builder

    WORKDIR /usr/src/teleprompter

    ENV NODE_ENV=production
    ENV SERVER_PRESET=bun

    COPY --from=base /usr/src/teleprompter/node_modules node_modules

    COPY . .

    RUN bun run build

FROM oven/bun:1.3-distroless

    WORKDIR /opt/teleprompter
    EXPOSE 3000

    COPY --from=builder /usr/src/teleprompter/.output ./

    CMD [ "bun", "run", "./server/index.mjs" ]
