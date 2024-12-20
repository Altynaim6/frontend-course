import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/react-task-app/',
  build: {
    outDir: 'dist',
  }
});
