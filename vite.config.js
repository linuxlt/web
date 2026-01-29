import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'unplugin-vue-markdown/vite'
import path from 'path'

function markdownChangeLogger() {
  return {
    name: 'markdown-change-logger',
    apply: 'serve',
    handleHotUpdate({ file, timestamp }) {
      if (file.endsWith('.md')) {
        const relativePath = path.relative(process.cwd(), file)
        const time = new Date(timestamp).toLocaleTimeString()
        console.log(`\n\x1b[36m[${time}]\x1b[0m \x1b[33mMarkdown modified:\x1b[0m ${relativePath}`)
      }
    }
  }
}

export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    Markdown({
      frontmatter: true,
      exposeFrontmatter: true,
      exportFrontmatter: true
    }),
    markdownChangeLogger()
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
