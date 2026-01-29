import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-vue-markdown'
import path from 'path'
import fs from 'fs'

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

// Get all markdown slugs for SSG
function getMarkdownSlugs(dir) {
  const fullPath = path.resolve(__dirname, 'src/content', dir)
  if (!fs.existsSync(fullPath)) return []
  return fs.readdirSync(fullPath)
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace('.md', ''))
}

// Get all authors from markdown frontmatter
function getAuthors() {
  const authors = new Set()
  const dirs = ['news', 'meetups']

  dirs.forEach(dir => {
    const fullPath = path.resolve(__dirname, 'src/content', dir)
    if (!fs.existsSync(fullPath)) return

    fs.readdirSync(fullPath)
      .filter(file => file.endsWith('.md'))
      .forEach(file => {
        const content = fs.readFileSync(path.join(fullPath, file), 'utf-8')
        const match = content.match(/^---[\s\S]*?author:\s*(.+?)[\r\n]/m)
        if (match) {
          authors.add(match[1].trim().toLowerCase().replace(/\s+/g, '-'))
        }
      })
  })

  return [...authors]
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
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    includedRoutes() {
      const staticPaths = ['/index', '/news', '/meetups', '/community']
      const newsPaths = getMarkdownSlugs('news').map(slug => `/news/${slug}`)
      const meetupPaths = getMarkdownSlugs('meetups').map(slug => `/meetups/${slug}`)
      const authorPaths = getAuthors().map(slug => `/author/${slug}`)

      return [...staticPaths, ...newsPaths, ...meetupPaths, ...authorPaths]
    }
  }
})
