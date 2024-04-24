FROM oven/bun:1
WORKDIR /usr/src/app

COPY package.json bun.lockb ./

RUN bun install --frozen-lockfile --production
COPY src ./src

ENV NODE_ENV=production
USER bun

EXPOSE 3001/tcp
ENTRYPOINT ["bun", "src/ws/server.ts"]
