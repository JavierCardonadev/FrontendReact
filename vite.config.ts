import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './jest_dom_extension.ts',
    exclude: ['**/*.stories.{js,jsx,ts,tsx}'],
    include: ['src/**/*.test.{js,ts,tsx}'],
  },
});
