import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // biar bisa diakses dari device lain (opsional)
    port: 5173
  }
});
