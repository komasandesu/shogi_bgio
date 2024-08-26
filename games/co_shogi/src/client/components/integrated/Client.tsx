import { Client as BGClient } from 'boardgame.io/react'
import CoShogi from '../../../core'
import CoShogiMainView from '../ui/MainView'
const Client = BGClient({ game: CoShogi, board: CoShogiMainView, debug: true })

// import MainViewOffline from '../ui/develop/MainView_offline'
// const Client = BGClient({ game: Shogi, board: MainViewOffline, debug: true })

export default Client
