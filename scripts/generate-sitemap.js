import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

const SITE_URL = 'https://linux.lt'

function getMarkdownSlugs(dir) {
  const fullPath = path.resolve(rootDir, 'src/content', dir)
  if (!fs.existsSync(fullPath)) return []
  return fs.readdirSync(fullPath)
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace('.md', ''))
}

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

function generateSitemap() {
  const staticPaths = ['/index.html', '/news.html', '/meetups.html', '/community.html']
  const newsPaths = getMarkdownSlugs('news').map(slug => `/news/${slug}.html`)
  const meetupPaths = getMarkdownSlugs('meetups').map(slug => `/meetups/${slug}.html`)
  const authorPaths = getAuthors().map(slug => `/author/${slug}.html`)

  const allPaths = [...staticPaths, ...newsPaths, ...meetupPaths, ...authorPaths]

  const today = new Date().toISOString().split('T')[0]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPaths.map(p => `  <url>
    <loc>${SITE_URL}${p}</loc>
    <lastmod>${today}</lastmod>
  </url>`).join('\n')}
</urlset>`

  const distPath = path.resolve(rootDir, 'dist')
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true })
  }

  fs.writeFileSync(path.join(distPath, 'sitemap.xml'), sitemap)
  console.log('Generated sitemap.xml')
}

generateSitemap()
