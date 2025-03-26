import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Разрешает внешние подключения
    // port: 3000, // Указывает порт (должен совпадать с EXPOSE)
  },
})
