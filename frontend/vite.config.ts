import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { ngrok } from 'vite-plugin-ngrok'
import dotenv from 'dotenv'
import tailwindcss from '@tailwindcss/vite'

dotenv.config()

export default defineConfig({
  base: process.env.NODE_ENV === 'development' ? '/' : '/',
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
     ngrok({
      authtoken: process.env.NGROK_AUTHTOKEN,
      hostname: process.env.NGROK_DOMAIN,
     })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    hmr: {
      protocol: 'wss',
      host: process.env.NGROK_DOMAIN,
      clientPort: 443
    },
    cors: false
  },
  preview: {
    port: 4173,
    strictPort: true
  },
  build: {
    sourcemap: process.env.NODE_ENV !== 'production',
    chunkSizeWarningLimit: 1600
  }
})