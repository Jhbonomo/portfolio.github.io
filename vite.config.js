import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  root: '.',
  base: './',

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,

    rollupOptions: {
      input: {
        main: 'index.html',
        projectAi: 'projects/project-ai-interaction.html',
        projectRetail: 'projects/project-brazilian-retail.html',
        projectMuseum: 'projects/project-museum-app.html',
        projectScience: 'projects/project-scientific-collaboration.html',
        projectTeachers: 'projects/project-teachers-ux.html',
        projectUxMapping: 'projects/project-ux-mapping.html',
      },
    },

    // Minificação
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log em produção
        drop_debugger: true,
      },
    },

    // Otimizações
    cssMinify: true,
    assetsInlineLimit: 4096, // Inline assets < 4kb
  },

  // Dev server
  server: {
    port: 3000,
    open: true,
    cors: true,
  },

  // Preview server
  preview: {
    port: 4173,
  },

  // CSS
  css: {
    postcss: './postcss.config.js',
    devSourcemap: true,
  },

  plugins: [
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          injectScript: '<script type="module" src="/assets/js/main.js"></script>',
        },
      },
    }),
  ],
});
