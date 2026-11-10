# Contributing

You are more than welcome to contribute to the web site https://www.linux.lt/. Please follow the guide below.

## Project structure

The site is built with [Hugo](https://gohugo.io/) (v0.158 or newer).

```
content/
  news/        ← news articles (Markdown)
  meetups/     ← event posts (Markdown)
data/          ← community links (IRC, Matrix, Signal)
layouts/       ← page templates, RSS feed and sitemap
  _partials/   ← header, footer, cards
assets/        ← CSS and JavaScript
static/        ← files copied as-is (robots.txt)
hugo.toml      ← site configuration
```

## Adding a news article

Create a file in `content/news/` named `YYYY-MM-title.md`:

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

Create a file in `content/meetups/` named `YYYY-MM-DD-title.md`:

```markdown
---
title: Event name
date: 2026-03-14 18:00:00
location: Venue, City
author: Vaidas
description: One sentence summary.
---

Event details go here.
```

The time must include seconds (`18:00:00`). Dates are in Lithuanian time (`Europe/Vilnius`).

## Local development

```bash
hugo server
```

Open `http://localhost:1313`.

## Build

```bash
hugo --minify
```

Output goes to `dist/`. This also generates `sitemap.xml` and RSS `feed.xml`.

## Opening a pull request

1. Fork the repo on [GitHub](https://github.com/linuxlt/web).
2. Create a branch for your change.
3. Add your content or fix.
4. Open a pull request against `master`.
