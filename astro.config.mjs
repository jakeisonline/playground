import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import vercel from "@astrojs/vercel"
import react from "@astrojs/react"
import mdx from "@astrojs/mdx"
import icon from "astro-icon"
import sitemap from "@astrojs/sitemap"

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx({
      syntaxHighlight: "shiki",
      shikiConfig: {
        theme: "plastic",
      },
    }),
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    icon(),
    sitemap({
      customPages: ["https://jakeisonline.com"],
    }),
  ],
  prefetch: true,
  build: {
    format: "file",
  },
  site: "https://jakeisonline.com",
  base: "/components",
  output: "static",
  trailingSlash: "never",
  adapter: vercel({
    includeFiles: ["./public/fonts/urbanist-latin-400-normal.woff"],
    excludeFiles: ["./components.json"],
    webAnalytics: {
      enabled: true,
    },
  }),
})
