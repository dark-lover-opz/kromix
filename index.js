// Minimal Kromix bootstrap (plugin-based scaffold)
// Install dependencies first: npm install

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { pathToFileURL } from 'url';

dotenv.config();

const PLUGINS_DIR = path.resolve('./plugins');

async function loadPlugins(dir = PLUGINS_DIR) {
  const plugins = [];
  if (!fs.existsSync(dir)) return plugins;
  const files = await fs.promises.readdir(dir);
  for (const f of files) {
    if (!f.endsWith('.js') && !f.endsWith('.mjs')) continue;
    try {
      const modPath = path.join(dir, f);
      // Convert absolute path to file:// URL so dynamic import works under ESM
      const imported = await import(pathToFileURL(modPath).href);
      const mod = imported?.default ?? imported;
      if (typeof mod === 'function') {
        plugins.push({ name: f, init: mod });
      } else if (mod && typeof mod.init === 'function') {
        plugins.push({ name: f, init: mod.init });
      } else {
        console.warn(`Plugin ${f} does not export a function or init()`);
      }
    } catch (err) {
      console.error(`Failed to load plugin ${f}:`, err);
    }
  }
  return plugins;
}

async function start() {
  console.log('Kromix scaffold starting...');
  console.log('Node env:', process.env.NODE_ENV || 'development');

  const plugins = await loadPlugins();
  console.log(`Loaded ${plugins.length} plugin(s).`);

  // Initialize plugins (simple contract: plugin.init({}) )
  for (const p of plugins) {
    try {
      await p.init({ env: process.env });
      console.log(`Initialized plugin: ${p.name}`);
    } catch (err) {
      console.error(`Plugin ${p.name} init error:`, err);
    }
  }

  console.log('Scaffold started. Implement Baileys connection in src/ or index.js.');
}

start().catch(err => {
  console.error('Start failed:', err);
  process.exit(1);
});
