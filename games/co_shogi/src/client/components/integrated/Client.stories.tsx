import { expect } from '@storybook/jest'
import { userEvent, within } from '@storybook/testing-library'
import Client from './Client'
import type { Meta, ComponentStoryObj } from '@storybook/react'

const meta: Meta<typeof Client> = { component: Client }
export default meta

export const Draw: ComponentStoryObj<typeof Client> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.getByText('プレイヤー0 のターンです')
    ).toBeInTheDocument()
  },
}

export const WinBlack: ComponentStoryObj<typeof Client> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.getByText('プレイヤー0 のターンです')
    ).toBeInTheDocument()
    await userEvent.click(canvas.getByTestId('cell-1-2'))
    await userEvent.click(canvas.getByTestId('cell-1-1'))
    await userEvent.click(canvas.getByTestId('cell-promotion'))

    await expect(
      canvas.getByText('プレイヤー1 のターンです')
    ).toBeInTheDocument()
    await userEvent.click(canvas.getByTestId('cell-0-0'))
    await userEvent.click(canvas.getByTestId('cell-0-3'))
    await userEvent.click(canvas.getByTestId('cell-unpromotion'))
    
    await expect(
      canvas.getByText('プレイヤー0 のターンです')
    ).toBeInTheDocument()
    await userEvent.click(canvas.getByTestId('cell-1-1'))
    await userEvent.click(canvas.getByTestId('cell-1-0'))
    
    await expect(canvas.getByText('ゲーム終了: プレイヤー0 の勝利')).toBeInTheDocument()
  },
}
