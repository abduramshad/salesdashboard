# myG Sales Dashboard: PWA package

Files
- index.html        the dashboard (all libraries are bundled in vendor/, so it works offline)
- manifest.json     app name, short name, theme colour, icons
- sw.js             service worker (offline support)
- icons/            192, 512, maskable 512 and 180 (iOS) icons
- vendor/           Chart.js 4.4.1, SheetJS 0.18.5, qrcode-generator 1.4.4

Host it (GitHub Pages)
1. Copy every file and folder into a folder of your site repo, for example `sales/`
   (so the app lives at https://abduramshad.github.io/armk/sales/).
2. Commit and push. GitHub Pages serves over HTTPS, which service workers require.
3. Open the URL once while online. After that the dashboard loads offline using the data saved on the device.
4. Install: Chrome/Edge show an "Install app" button in the dashboard header (or the browser menu);
   on iPhone use Share, then Add to Home Screen.

Notes
- Keep the files together; every path is relative, so any folder name works.
- After you change any file, raise VERSION in sw.js (for example myg-sales-v2) so phones pick up the update.
- The "Google Sheet" button needs a host that lets the page call Google. This works on your own site; it is blocked inside the Claude preview.
- Share the Google Sheet as "Anyone with the link" (Viewer is enough; Editor is not needed).
