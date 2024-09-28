import { action } from '@storybook/addon-actions'
import MainView from './MainView'
import type { Meta, ComponentStoryObj } from '@storybook/react'

const meta: Meta<typeof MainView> = { component: MainView }
export default meta

export const Start: ComponentStoryObj<typeof MainView> = {
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
      is_needed_promotion: false,
      captured_piece_first: [['歩','0',false],['歩','0',false]],
      captured_piece_second: [['歩','1',false],['歩','1',false]],
      stage_name: 'SelectKoma',
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
