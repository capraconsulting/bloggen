# Fagartikler

## Tech

- [Astro](https://docs.astro.build)
- TypeScript
- [pnpm](https://pnpm.io/)

## Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm install`         | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

If you forget to write the `p` before `npm`, I would recommend [ni](https://github.com/antfu-collective/ni), to make it easier to jump between projects.

## How to add an article

1. Add your file to `src/content/blog/[your_article_name].[md/mdx]`
2. Add article config to frontmatter:
```
---
title: 'Your title'
intro: 'Optional intro placed before the hero image'
description: 'Description placed in <head> for SEO'
pubDate: 'yyyy.MM.dd'
author: 'Your name'
heroImage: '/src/assets/images/your-article-name/hero.webp'
tags: ['Frontend', 'Backend']
canonical: 'https://optional-url-if-article-is-published-externally-first.com'
---
```
3. Add images to `src/assets/images/`.  
  a. Let's try to keep it tidy, if you only have a hero image you can name the image file the same as the article file. If you have multiple images, please create a folder with the name of the article file.
4. Write your article in [markdown](https://www.markdownguide.org/cheat-sheet/). Tip. you can [convert a google docs to markdown](https://gdoc2md.com/).
5. Create a PR/merge to main.