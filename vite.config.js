import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),react()],
  server: {
    host: true,
    allowedHosts: [
      // 👇 your ngrok domain
      "ab0c-2600-6c40-5900-43d-fd4d-db81-738f-c480.ngrok-free.app",'localhost'
    ],
    // proxy: {
    //   '/api': 'http://localhost:8080', // Proxy all `/api` calls to Spring Boot
    // },
  },
})
