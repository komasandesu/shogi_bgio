FROM node:19.6.0-alpine as base


WORKDIR /app

# 依存関係のインストール
COPY package.json yarn.lock ./
COPY server/package.json ./server/
COPY lobby/package.json ./lobby/
COPY games/shogi/package.json ./games/shogi/package.json
COPY games/co_shogi/package.json ./games/co_shogi/package.json
RUN yarn install --non-interactive --frozen-lockfile --production=false

COPY tsconfig.json ./
COPY games ./games

# lobbyのビルド
FROM base as lobby-build
COPY lobby ./lobby

# VITE_SERVER_URLをビルド時に注入
ARG VITE_SERVER_URL
# ENV VITE_SERVER_URL=${VITE_SERVER_URL}

# RUN echo "VITE_SERVER_URL is ${VITE_SERVER_URL}"

RUN yarn workspace @bgio-typed-storybook/lobby build

# shogiのビルド
FROM base as shogi-build
RUN yarn workspace @bgio-typed-storybook/shogi_online build

# co_shogiのビルド
FROM base as co_shogi-build
RUN yarn workspace @bgio-typed-storybook/co_shogi_online build

# nginxの設定ファイルを適用する（オプションでnginx.confを用意する場合）
COPY nginx.conf /etc/nginx/nginx.conf

# nginxを使用してビルドした静的ファイルを配信
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html/

# lobbyのファイルをコピー
COPY --from=lobby-build /app/lobby/dist/lobby/index.html ./lobby/index.html
COPY --from=lobby-build /app/lobby/dist/lobby/assets ./lobby/assets

# shogiのファイルをコピー
COPY --from=shogi-build /app/games/shogi/dist/client/index.html ./shogi/index.html
COPY --from=shogi-build /app/games/shogi/dist/client/assets ./shogi/assets

# co_shogiのファイルをコピー
COPY --from=co_shogi-build /app/games/co_shogi/dist/client/index.html ./co_shogi/index.html
COPY --from=co_shogi-build /app/games/co_shogi/dist/client/assets ./co_shogi/assets

# nginxの静的ファイルルーティングを確認する

# nginxの設定ファイルを適用する（オプションでnginx.confを用意する場合）
COPY nginx.conf /etc/nginx/nginx.conf