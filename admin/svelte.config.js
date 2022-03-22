import preprocess from "svelte-preprocess";
import WindiCSS from "vite-plugin-windicss";
import adapter from "@sveltejs/adapter-node";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",
    vite: () => ({
      plugins: [WindiCSS.default()],
    }),
    adapter: adapter({
      out: "build",
      precompress: false,
      env: {
        port: "PORT",
      },
    }),
  },
};

export default config;
