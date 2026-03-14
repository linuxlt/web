import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

const SITE_URL = 'https://linux.lt'
const SITE_TITLE = 'Linux.lt'
const SITE_DESCRIPTION = 'Lietuviška Linux bendruomenė – naujienos ir renginiai'
const SITE_LANGUAGE = 'lt'

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}
  const raw = match[1]
  const result = {}
  for (const line of raw.split(/\r?\n/)) {
    const colon = line.indexOf(':')
    if (colon === -1) continue
    const key = line.slice(0, colon).trim()
    const value = line.slice(colon + 1).trim()
    result[key] = value
  }
  return result
}

function getItems(dir, urlPrefix) {
  const fullPath = path.resolve(rootDir, 'src/content', dir)
  if (!fs.existsSync(fullPath)) return []

  return fs.readdirSync(fullPath)
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const content = fs.readFileSync(path.join(fullPath, file), 'utf-8')
      const fm = parseFrontmatter(content)
      const slug = file.replace('.md', '')
      return {
        title: fm.title || slug,
        date: fm.date ? new Date(fm.date) : new Date(0),
        author: fm.author || '',
        description: fm.description || fm.excerpt || '',
        link: `${SITE_URL}/${urlPrefix}/${slug}.html`,
      }
    })
    .filter(item => item.date > new Date(0))
}

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function generateRss() {
  const news = getItems('news', 'news')
  const meetups = getItems('meetups', 'meetups')

  const items = [...news, ...meetups]
    .sort((a, b) => b.date - a.date)

  const itemsXml = items.map(item => `  <item>
    <title>${escapeXml(item.title)}</title>
    <link>${escapeXml(item.link)}</link>
    <pubDate>${item.date.toUTCString()}</pubDate>
    ${item.author ? `<author>${escapeXml(item.author)}</author>` : ''}
    ${item.description ? `<description>${escapeXml(item.description)}</description>` : ''}
    <guid>${escapeXml(item.link)}</guid>
  </item>`).join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>${SITE_LANGUAGE}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${itemsXml}
  </channel>
</rss>`

  const distPath = path.resolve(rootDir, 'dist')
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true })
  }

  fs.writeFileSync(path.join(distPath, 'feed.xml'), rss)
  console.log(`Generated feed.xml (${items.length} items)`)
}

generateRss()
