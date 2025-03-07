import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './jest_dom_extension.ts',
    exclude: [
      '**/node_modules/**',
      '**/dist/**',

    ],
  },
});
