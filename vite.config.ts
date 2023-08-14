import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import vue from '@vitejs/plugin-vue';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslint(),
    AutoImport({
      eslintrc: {
        enabled: true,
      },
      dts: true,
      imports: ['vue', 'vue-router', 'vuex', '@vueuse/core'],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: true,
      types: [
        {
          from: 'vue',
          names: ['component'],
        },
      ],
      dirs: ['src/components', 'src/layouts'],
    }),
  ],
  // optimizeDeps: {
  //   include: ['element-plus'], // Включить элементы "element-plus" в процесс оптимизации зависимостей
  // },
  // build: {
  //   rollupOptions: {
  //     external: ['element-plus'],
  //   },
  // },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
              @import "@/assets/styles/_variables.scss";
            `,
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://my.vipsy.dev.millenial-tech.ru',
        changeOrigin: true,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
});
