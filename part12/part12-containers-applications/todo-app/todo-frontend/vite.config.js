import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['**/*.{test,spec}.{js,jsx}'],
    setupFiles: ['src/test/setup.js'],
    deps: {
      inline: ['@testing-library/react']
    }
  },
  plugins: [react()],
})
