import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'scr'),
      '@view': resolve(__dirname, 'scr/view'),
      '@utils': resolve(__dirname, 'scr/utils'),
      '@store': resolve(__dirname, 'scr/store'),
      '@router': resolve(__dirname, 'scr/router'),
      '@assets': resolve(__dirname, 'scr/assets'),
      '@scss': resolve(__dirname, 'scr/assets/scss'),
      '@module': resolve(__dirname, 'scr/components'),
    },
  },
  css: {
    devSourcemap: false,
  },
  build: {
    rollupOptions: {
      input: {
        sso: 'src/package/sso/index.html',
      },
      output: {
        chunkFileNames: 'js/[name].[hash].js',
        entryFileNames: 'js/[name].[hash].js',
        assetFileNames: '[ext]/[name].[hash].[ext]',
      },
    },
  },
});
