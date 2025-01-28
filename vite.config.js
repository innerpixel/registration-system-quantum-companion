import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'CosmicCompanionAI',
      formats: ['es', 'umd'],
      fileName: (format) => `cosmic-companion-ai.${format === 'umd' ? 'umd.cjs' : 'js'}`
    },
    rollupOptions: {
      external: ['vue', 'pinia'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          pinia: 'Pinia'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'style.css';
          return assetInfo.name;
        }
      }
    },
    cssCodeSplit: false
  }
})
