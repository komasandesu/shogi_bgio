FROM public.ecr.aws/docker/library/node:19.6.0-alpine as base
WORKDIR /app

COPY package.json yarn.lock ./
COPY server/package.json ./server/
COPY lobby/package.json ./lobby/

COPY games/shogi/package.json ./games/shogi/package.json

COPY games/co_shogi/package.json ./games/co_shogi/package.json

RUN yarn install --non-interactive --frozen-lockfile
COPY tsconfig.json ./
COPY games ./games


FROM base as co_shogi-base
ENV NODE_ENV develop

RUN yarn workspace @bgio-typed-storybook/co_shogi_online build


FROM nginx:1.23-alpine as co_shogi
WORKDIR /usr/share/nginx/html/

COPY --from=co_shogi-base /app/games/co_shogi/dist/client/index.html ./
COPY --from=co_shogi-base /app/games/co_shogi/dist/client/assets ./assets
