import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// This should match the name of your GitHub repository.
const REPOSITORY_NAME = "portfolio-website"; 

export default defineConfig({
  plugins: [react()],
  base: `/${REPOSITORY_NAME}/`,
  assetsInclude: ['**/*.doc', '**/*.docx'],
});