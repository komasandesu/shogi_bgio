import { Server, Origins } from 'boardgame.io/server'
import Shogi from '../../games/shogi/src/core'
import CoShogi from '../../games/co_shogi/src/core'

const server = Server({
  games: [Shogi,CoShogi],
  origins: [process.env.ORIGIN_URL ?? Origins.LOCALHOST],
})

// eslint-disable-next-line @typescript-eslint/no-floating-promises
server.run(8000)
