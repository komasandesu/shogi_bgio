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


FROM base as lobby-base
ARG VITE_SERVER_URL

COPY lobby ./lobby
RUN yarn workspace @bgio-typed-storybook/lobby build


FROM nginx:1.23-alpine as lobby
WORKDIR /usr/share/nginx/html/

COPY --from=lobby-base /app/lobby/dist/lobby/index.html ./
COPY --from=lobby-base /app/lobby/dist/lobby/assets ./assets
