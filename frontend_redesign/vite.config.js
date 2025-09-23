import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'), // Создаем "алиас" (псевдоним)
    },
  server: {
    host: true, // Разрешает внешние подключения
    // port: 3000, // Указывает порт (должен совпадать с EXPOSE)
  },
  },
});