import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";
import vercel from "@astrojs/vercel/serverless";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), image()],
  output: "server",
  adapter: process.env.NODE ? node({mode: "middleware"}) : vercel(),
  image: {
    service: process.env.NODE ? "astro/assets/services/sharp": "astro/assets/services/squoosh"
  }
});
