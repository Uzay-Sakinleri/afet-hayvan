import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";
import vercel from "@astrojs/vercel/serverless";
import node from "@astrojs/node";
import { loadEnv } from "vite";
const env = loadEnv(import.meta.env.MODE, process.cwd(), "" );
const isNode = env.IS_NODE === "true";

export default defineConfig({
  integrations: [tailwind(), image()],
  output: "server",
  adapter: isNode ? node({mode: "middleware"}) : vercel(),
  image: {
    service: isNode ? "astro/assets/services/sharp": "astro/assets/services/squoosh"
  }
});
