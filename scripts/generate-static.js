import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distDir = path.resolve(rootDir, 'dist')

// Read the built index.html as template
const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8')

// Get markdown slugs
function getMarkdownSlugs(dir) {
  const fullPath = path.resolve(rootDir, 'src/content', dir)
  if (!fs.existsSync(fullPath)) return []
  return fs.readdirSync(fullPath)
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace('.md', ''))
}

// Get authors from markdown
function getAuthors() {
  const authors = new Set()
  const dirs = ['news', 'meetups']

  dirs.forEach(dir => {
    const fullPath = path.resolve(rootDir, 'src/content', dir)
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

// Define all pages to generate
const pages = [
  { path: '/index.html', title: 'Linux.lt - Lietuvos Linux bendruomenė' },
  { path: '/news.html', title: 'Naujienos - Linux.lt' },
  { path: '/meetups.html', title: 'Renginiai - Linux.lt' },
  { path: '/community.html', title: 'Bendruomenė - Linux.lt' },
]

// Add news pages
getMarkdownSlugs('news').forEach(slug => {
  pages.push({ path: `/news/${slug}.html`, title: `${slug} - Linux.lt` })
})

// Add meetup pages
getMarkdownSlugs('meetups').forEach(slug => {
  pages.push({ path: `/meetups/${slug}.html`, title: `${slug} - Linux.lt` })
})

// Add author pages
getAuthors().forEach(slug => {
  pages.push({ path: `/author/${slug}.html`, title: `${slug} - Linux.lt` })
})

// Copy index.html to each page location
// The Vue app is already built, we just need to copy the HTML to the right places
pages.forEach(page => {
  const filePath = path.join(distDir, page.path)
  const dir = path.dirname(filePath)

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  // Update title in template
  let html = template.replace(/<title>.*?<\/title>/, `<title>${page.title}</title>`)

  fs.writeFileSync(filePath, html)
  console.log(`Generated: ${page.path}`)
})

console.log(`\nGenerated ${pages.length} static pages`)
