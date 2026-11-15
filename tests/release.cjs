// Use the same optional local-browser suite against a locally served production build.
// The production asset can be served with: npx vite preview --host 127.0.0.1 --port 4173
process.env.GAME_URL=process.env.GAME_URL||'http://localhost:4173/?test=1';
require('./browser.cjs');
