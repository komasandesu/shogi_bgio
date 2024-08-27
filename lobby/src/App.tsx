import React from 'react'
import { Lobby } from 'boardgame.io/react'
import CoShogiMainView from '../../games/co_shogi/src/client/components/ui/MainView'
import CoShogi from '../../games/co_shogi/src/core'
import MainView from '../../games/shogi/src/client/components/ui/MainView'
import Shogi from '../../games/shogi/src/core'


const Client: React.FC = () => {
  return (
    <>
      <Lobby
        gameServer={import.meta.env.VITE_SERVER_URL}
        lobbyServer={import.meta.env.VITE_SERVER_URL}
        gameComponents={[
          { game: Shogi, board: MainView },
          { game: CoShogi, board: CoShogiMainView },
        ]}
        debug={false}
      />
    </>
  )
}
export default Client
