FROM node:19.6.0-alpine as base
WORKDIR /app

COPY package.json yarn.lock ./
COPY server/package.json ./server/
COPY lobby/package.json ./lobby/
COPY games/shogi/package.json ./games/shogi/package.json

COPY games/co_shogi/package.json ./games/co_shogi/package.json

RUN yarn install --non-interactive --frozen-lockfile
COPY tsconfig.json ./
COPY games ./games


FROM base as server

# デフォルトのORIGIN_URLを設定
ENV ORIGIN_URL="http://localhost:3000"
RUN echo "ORIGIN_URL is ${ORIGIN_URL}"

COPY server ./server
RUN yarn workspace @bgio-typed-storybook/server build
CMD ["yarn", "workspace", "@bgio-typed-storybook/server", "serve"]
