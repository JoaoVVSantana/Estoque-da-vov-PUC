import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',                      // Permite acesso externo
    port: process.env.PORT || 3001,      // Porta dinâmica para o desenvolvimento
    proxy: {
      '/api': {
        target: process.env.REACT_APP_API_URL || 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      }
    }
  },
  preview: {
    host: '0.0.0.0',                     // Permite acesso externo
    port: process.env.PORT || 3001      // Porta de preview
  }
})
