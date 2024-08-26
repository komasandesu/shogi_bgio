import { action } from '@storybook/addon-actions'
import CoShogiMainView from './MainView'
import type { Meta, ComponentStoryObj } from '@storybook/react'

const meta: Meta<typeof CoShogiMainView> = { component: CoShogiMainView }
export default meta

export const Start: ComponentStoryObj<typeof CoShogiMainView> = {
  args: {
    G: {
      board: [
        [['歩','1',false], ['歩','0',false], null],
        [['歩','1',false], ['歩','1',false], ['歩','0',false]],
        [null, ['歩','0',false], ['歩','1',false]],
      ],
      selected_piece_position: null,
      next_move_place: null,
      movable_place: null,
      captured_piece_first: [['歩','0',false],['歩','0',false]],
      captured_piece_second: [['歩','1',false],['歩','1',false]],
      stage_name: 'SelectKoma',
      piece_setting_board:[
                            [['歩','0',false],['香','0',false],['桂','0',false],['銀','0',false],['金','0',false],['角','0',false],['飛','0',false],['王','0',false],null],
                          ],
      prepare_board_first:[
                            [null,null,null,null,null,null,null,null,null],
                            [null,null,null,null,null,null,null,null,null],
                            [null,null,null,null,null,null,null,null,null],
                          ],
      prepare_board_second:[
                            [null,null,null,null,null,null,null,null,null],
                            [null,null,null,null,null,null,null,null,null],
                            [null,null,null,null,null,null,null,null,null],
                          ],
      cost_first:0,
      cost_second:0,
      is_ready_first: false,
      is_ready_second: false,
      selected_setting_piece_position_first: null,
      selected_setting_piece_position_second: null
    },
    moves: {
      clickCell: action('clickCell'),
    },
    ctx: {
      currentPlayer: '0',
      gameover: undefined,
      numPlayers: 2,
      playOrder: ['0', '1'],
      playOrderPos: 0,
      activePlayers: null,
      turn: 1,
      phase: '',
    },
  },
}
