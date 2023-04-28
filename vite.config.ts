import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: ['@import "@/styles/variables.less";', '@import "@/styles/mixins.less";'].join('')
      }
    }
  },
  server: {
    open: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3008/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    cssCodeSplit: false,
    sourcemap: true,
    manifest: true,
    cssMinify: true,
    rollupOptions: {
      input: {
        index: 'template.html',
      },
    }
  },
  ssr: {
    format: 'cjs'
  }
})
