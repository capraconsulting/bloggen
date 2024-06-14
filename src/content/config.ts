import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		intro: z.string().optional(),
		description: z.string(),
		pubDate: z.coerce.date(),
		author: z.string(),
		heroImage: z.string(),
		tags: z.string().array().optional(),
		canonical: z.string().optional(),
	}),
});

export const collections = { blog };
