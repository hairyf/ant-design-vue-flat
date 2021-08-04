import basicConfig, { name, file } from './rollup.config'
import { defineConfig } from 'rollup'

export default defineConfig({
  ...basicConfig,
  output: {
    name,
    file: file('esm'),
    format: 'es'
  }
})
