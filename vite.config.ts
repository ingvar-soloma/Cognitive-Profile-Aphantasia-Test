import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: Number.parseInt(env.VITE_PORT || '3000'),
        host: env.VITE_HOST || '0.0.0.0',
        allowedHosts: (env.VITE_ALLOWED_HOSTS || 'localhost').split(',')
      },
      plugins: [react(), viteSingleFile()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
        'process.env.VITE_TELEGRAM_BOT_NAME': JSON.stringify(env.VITE_TELEGRAM_BOT_NAME)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
