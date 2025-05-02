import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
    server: {
        port: 3003,
    },
    resolve: {
        alias: {
            '@classes': path.resolve(__dirname, './src/classes'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@constants': path.resolve(__dirname, './src/constants'),
            '@scenes': path.resolve(__dirname, './src/scenes'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@entities': path.resolve(__dirname, './src/entities'),
        },
    },
})
