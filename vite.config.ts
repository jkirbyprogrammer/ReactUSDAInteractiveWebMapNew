import { defineConfig, normalizePath } from 'vite';
import plugin from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { resolve } from 'path'; 

// https://vitejs.dev/config/

export default defineConfig({
    plugins: [
        plugin(),
        viteStaticCopy({
            // Define the files or directories to copy
          targets: [
            {
              src: normalizePath(resolve(__dirname, 'src/assets/2025StateUsSecLayer.json')), // Source file or directory
              dest: 'assets', // Destination folder within your build output (e.g., 'dist')
            },
            {
              src: normalizePath(resolve(__dirname, 'src/assets/2025StatePresLayer.json')),
              dest: 'assets',
            },
            {
              src: normalizePath(resolve(__dirname, 'src/assets/2025CountyUsSecLayer.json')), 
              dest: 'assets', 
            },
            {
              src: normalizePath(resolve(__dirname, 'src/assets/2025CountyPresLayer.json')),
              dest: 'assets',
            },    
            {
              src: normalizePath(resolve(__dirname, 'src/assets/2024StateUsSecLayer.json')), 
              dest: 'assets', 
            },
            {
              src: normalizePath(resolve(__dirname, 'src/assets/2024StatePresLayer.json')),
              dest: 'assets',
            },                    
            {
              src: normalizePath(resolve(__dirname, 'src/assets/2024CountyUsSecLayer.json')), 
              dest: 'assets',
            },
            {
              src: normalizePath(resolve(__dirname, 'src/assets/2024CountyPresLayer.json')),
              dest: 'assets',
            },
            {
              src: normalizePath(resolve(__dirname, 'src/assets/2023StateUsSecLayer.json')),
              dest: 'assets', 
            },
            {
              src: normalizePath(resolve(__dirname, 'src/assets/2023StatePresLayer.json')),
              dest: 'assets',
            },  
            {
              src: normalizePath(resolve(__dirname, 'src/assets/2023CountyUsSecLayer.json')), 
              dest: 'assets', 
            },
            {
              src: normalizePath(resolve(__dirname, 'src/assets/2023CountyPresLayer.json')),
              dest: 'assets',
            },              
            {
              src: normalizePath(resolve(__dirname, 'src/assets/2022StateUsSecLayer.json')),
              dest: 'assets', 
            },
            {
              src: normalizePath(resolve(__dirname, 'src/assets/2022StatePresLayer.json')),
              dest: 'assets',
            },  
            {
              src: normalizePath(resolve(__dirname, 'src/assets/2022CountyUsSecLayer.json')), 
              dest: 'assets', 
            },
            {
              src: normalizePath(resolve(__dirname, 'src/assets/2022CountyPresLayer.json')),
              dest: 'assets',
            },              
            {
              src: normalizePath(resolve(__dirname, 'src/assets/2021StateUsSecLayer.json')), 
              dest: 'assets', 
            },
            {
              src: normalizePath(resolve(__dirname, 'src/assets/2021StatePresLayer.json')),
              dest: 'assets',
            },  
            {
              src: normalizePath(resolve(__dirname, 'src/assets/2021CountyUsSecLayer.json')),
              dest: 'assets',
            },
            {
              src: normalizePath(resolve(__dirname, 'src/assets/2021CountyPresLayer.json')),
              dest: 'assets',
            },              
            {
              src: normalizePath(resolve(__dirname, 'src/assets/2024NationalUSFSFireOccurrencePoint.json')),
              dest: 'assets',
            },  
            {
              src: normalizePath(resolve(__dirname, 'src/assets/2023NationalUSFSFireOccurrencePoint.json')),
              dest: 'assets',
            },  
            {
              src: normalizePath(resolve(__dirname, 'src/assets/2022NationalUSFSFireOccurrencePoint.json')),
              dest: 'assets',
            },  
            {
              src: normalizePath(resolve(__dirname, 'src/assets/2021NationalUSFSFireOccurrencePoint.json')),
              dest: 'assets',
            }                                                                                              
          ],
        })        
    ],
    server: {
        port: 55211,
    }
})
