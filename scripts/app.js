import { renderSite } from "./render.js";

async function boot() {
  const mount = document.querySelector("#app");
  try {
    const response = await fetch("data/site.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`Could not load content JSON: ${response.status}`);
    const data = await response.json();
    renderSite(data, mount);
  } catch (error) {
    mount.innerHTML = `
      <main class="mx-auto flex min-h-screen max-w-2xl items-center px-5">
        <div class="rounded-lg border border-gold-500/30 bg-white p-8 shadow-glow dark:bg-neutral-900">
          <p class="text-sm font-semibold uppercase tracking-[0.22em] text-gold-700 dark:text-gold-300">Content load error</p>
          <h1 class="mt-3 text-3xl font-semibold text-stone-950 dark:text-white">The JSON content file could not be loaded.</h1>
          <p class="mt-4 leading-7 text-stone-700 dark:text-stone-300">Serve this folder through a local static server so the browser can fetch data/site.json.</p>
          <p class="mt-4 rounded-md bg-stone-100 p-3 text-sm text-stone-700 dark:bg-neutral-800 dark:text-stone-300">${error.message}</p>
        </div>
      </main>
    `;
  }
}

boot();
