import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/counter/',
  root: '.',
  build: {
    outDir: 'dist'
  }
});