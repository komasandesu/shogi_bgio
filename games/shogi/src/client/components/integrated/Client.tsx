import { Client as BGClient } from 'boardgame.io/react'
import Shogi from '../../../core'
import MainView from '../ui/MainView'
const Client = BGClient({ game: Shogi, board: MainView, debug: true })

// import MainViewOffline from '../ui/develop/MainView_offline'
// const Client = BGClient({ game: Shogi, board: MainViewOffline, debug: true })

export default Client
