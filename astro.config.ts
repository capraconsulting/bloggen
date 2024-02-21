import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
	site: 'https://blogg.capraconsulting.no',
	integrations: [mdx()],
});
