import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  root: './src',
  publicDir: './public',
  build: {
    // root (= ./src) から見た相対パスで指定
    outDir: '../dist/lobby',
    emptyOutDir: true,
  },
  server: {
    open: true,
  },
  plugins: [react()],
  test: {
    globals: true,
    include: ['./**/*.test.{ts,tsx}'],
    exclude: [],
  },
  resolve: {
    alias: {
      shogi: path.resolve(__dirname, '../games/shogi/src'),
      co_shogi: path.resolve(__dirname, '../games/co_shogi/src'),
    },
  },
})
