import { defineCollection, defineContentConfig } from "@nuxt/content"
import { z } from "zod"

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: "page",
      source: "posts/*.md",
      schema: z.object({
        slug: z.string(),
        title: z.string(),
        description: z.string(),
        date: z.string(),
        author: z.string(),
        cover_text: z.string(),
        cover_color: z.string(),
        tags: z.array(z.string()),
        live: z.string(),
        repo: z.string(),
      }),
    }),
  },
})
