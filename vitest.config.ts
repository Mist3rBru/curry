import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    bail: 1,
    globals: true,
    cache: false
  }
})
