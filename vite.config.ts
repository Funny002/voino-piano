import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  publicDir: resolve(__dirname, 'public'),
  resolve: {
    alias: {
      '@view': resolve(__dirname, 'src/view'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@store': resolve(__dirname, 'src/store'),
      '@router': resolve(__dirname, 'src/router'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@scss': resolve(__dirname, 'src/assets/scss'),
      '@module': resolve(__dirname, 'src/components'),
    },
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
