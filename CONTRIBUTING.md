# Contributing

You are more than welcome to contribute to the web site https://www.linux.lt/. Please follow the guide below.

## Project structure

```
src/
  content/
    news/      ← news articles (Markdown)
    meetups/   ← event posts (Markdown)
  components/  ← Vue components
  views/       ← page templates
scripts/       ← build scripts (sitemap, RSS)
```

## Adding a news article

Create a file in `src/content/news/` named `YYYY-MM-title.md`:

```markdown
---
title: Your title
date: 2026-03-14
author: Simonas
excerpt: One sentence summary.
---

Article body goes here.
```

## Adding an event

Create a file in `src/content/meetups/` named `YYYY-MM-DD-title.md`:

```markdown
---
title: Event name
date: 2026-03-14 18:00
location: Venue, City
author: Vaidas
description: One sentence summary.
---

Event details go here.
```

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Build

```bash
npm run build
```

Output goes to `dist/`. This also generates `sitemap.xml` and RSS `feed.xml`.

## Opening a pull request

1. Fork the repo on [GitHub](https://github.com/linuxlt/web).
2. Create a branch for your change.
3. Add your content or fix.
4. Open a pull request against `master`.
