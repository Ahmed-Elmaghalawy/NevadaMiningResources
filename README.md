# Nevada Mining Resources Static Site

This is a framework-free static rebuild of the archived Nevada Mining Resources site.

## Structure

- `index.html` loads Tailwind from the CDN and starts the vanilla JavaScript renderer. The site is dark-only.
- `data/site.json` contains the site copy, navigation, offices, resource lists, and white-label notes.
- `scripts/` contains small rendering and theme modules.
- `assets/images/` contains reusable brand images copied from the old site.
- `_archive_old_not_used/` contains the original captured HTML pages and downloaded legacy asset folders.

## Run locally

Serve the folder with any static server, then open the local URL. The site fetches `data/site.json`, so opening `index.html` directly from disk may be blocked by browser file restrictions.

```powershell
python -m http.server 8080
```

## White label

Edit `data/site.json` first. Replace the image files in `assets/images/` if the brand changes. The renderer expects the same JSON shape, so labels, copy, links, offices, and resource groups can be changed without touching the JavaScript.
