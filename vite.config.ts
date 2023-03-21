import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@assets': resolve(__dirname, 'src', 'assets'),
      '@components': resolve(__dirname, 'src', 'components'),
      '@models': resolve(__dirname, 'src', 'models'),
      '@modules': resolve(__dirname, 'src', 'modules'),
      '@pages': resolve(__dirname, 'src', 'pages'),
      '@shared': resolve(__dirname, 'src', 'shared'),
      '@styles': resolve(__dirname, 'src', 'styles'),
    },
  },
  plugins: [react()],
})
