import { defineConfig } from 'vitest/config'
import openApiPlugin from './vitest-openapi-plugin'

export default defineConfig({
  plugins: [openApiPlugin],
  test: {
    watchExclude: ['client/**', 'build/routes/**']
  }
})