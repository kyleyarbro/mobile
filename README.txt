ShadowPoint Watchtower - GitHub Pages bundle

Files:
- index.html
- watchtower_v4_manifest.webmanifest
- watchtower_v4_sw.js
- watchtower_v4_bootstrap.sql
- .nojekyll

Deploy steps:
1. Create a public GitHub repository.
2. Upload all files in this folder to the repository root.
3. In GitHub: Settings -> Pages.
4. Under Build and deployment, set Source to 'Deploy from a branch'.
5. Set Branch to 'main' and Folder to '/ (root)'.
6. Visit the published URL after Pages finishes deploying.
7. Run watchtower_v4_bootstrap.sql once in Supabase.

Notes:
- index.html is the app entry point.
- .nojekyll prevents GitHub Pages from processing the site with Jekyll.
- HTTPS on GitHub Pages enables service worker and install behavior.
