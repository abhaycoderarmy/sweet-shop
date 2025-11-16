import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  // Use environment variables when available. When running via Vite,
  // environment variables prefixed with VITE_ can be provided in
  // `.env` files. We also allow overriding via standard process.env
  // for convenience when starting the dev server.
  const port = process.env.VITE_PORT || 3000;
  const proxyTarget = process.env.VITE_API_PROXY_TARGET || 'http://localhost:5000';

  return {
    plugins: [react()],
    server: {
      port: Number(port),
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
        }
      }
    }
  };
});