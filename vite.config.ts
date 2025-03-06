import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './jest_dom_extension.ts',
    exclude: [
      'node_modules',
      'dist',
    ],
  },
});
