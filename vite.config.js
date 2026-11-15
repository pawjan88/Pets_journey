import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
export default defineConfig({base:'./',plugins:[viteSingleFile()],build:{target:'es2020',assetsInlineLimit:10000000,chunkSizeWarningLimit:2000},server:{host:'0.0.0.0'}});
