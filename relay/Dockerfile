# Use the official Bun image
# See all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# Install dependencies into a temp directory to cache and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Install production dependencies only
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# Copy dependencies from temp to final image and copy project files
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# Optional: Run tests and build
ENV NODE_ENV=production
RUN bun test
RUN bun run build

# Final release image with production dependencies and source files
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/index.ts .
COPY --from=prerelease /usr/src/app/package.json .

# Set user to bun, expose port, and start the app
USER bun
EXPOSE 3000/tcp
ENTRYPOINT ["bun", "run", "index.ts"]
