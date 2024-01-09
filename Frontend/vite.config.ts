import federation from '@originjs/vite-plugin-federation';
import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(
  defineConfig({
    plugins: [
      react(),
      basicSsl(),
      federation({
        name: 'Auftragsverwaltung',
        filename: 'remoteEntry.js',
        exposes: {
          './AuftragsverwaltungApp': './src/App',
        },
        shared: [
          'react',
          'react-dom',
          '@mui/lab',
          '@mui/material',
          '@mui/system',
          'react-router-dom',
          'redux',
          'react-redux',
          'redux-persist',
          '@reduxjs/toolkit',
          '@azure/msal-react',
          '@azure/msal-browser',
        ],
      }),
    ],
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, './src/components'),
        '@models': path.resolve(__dirname, './src/models'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@locales': path.resolve(__dirname, './src/locales'),
        '@routes': path.resolve(__dirname, './src/routes'),
        '@redux': path.resolve(__dirname, './src/redux'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@layouts': path.resolve(__dirname, './src/layouts'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@api': path.resolve(__dirname, './src/api'),
        '@sections': path.resolve(__dirname, './src/sections'),
      },
    },
    envDir: './src/env',
    server: {
      open: true,
      https: true,
      host: 'localhost',
      port: 3005,
    },
    build: {
      outDir: './build',
      target: 'esnext',
      cssCodeSplit: false,
      minify: false,
      modulePreload: false,
    },
    define: {
      APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },
  })
);
