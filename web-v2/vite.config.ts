import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  publicDir: path.resolve(__dirname, '../docs-v2'),
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    dedupe: ['react', 'react-dom'],
  },
  server: {},
  // 生产环境专属配置
  build: {
    outDir: '../docs-v2',
    emptyOutDir: false,
    assetsDir: '.web', // 静态资源存放目录
    chunkSizeWarningLimit: 2000, // 分块大小警告阈值(KB)
    rollupOptions: {
      output: {
        assetFileNames: '.web/assets/[name]-[hash][extname]',
        entryFileNames: '.web/js/[name]-[hash].js',
        chunkFileNames: '.web/js/[name]-[hash].js',
        // 代码分割策略
        // manualChunks: {
        // react: ['react', 'react-dom'], // 单独打包 React 相关库
        // utils: ['axios'], // 工具库单独打包
        // },
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
})
