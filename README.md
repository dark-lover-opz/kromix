# kromix

Levanter-style WhatsApp bot scaffold (plugin-based) using Baileys.

Quick start:
1. Clone the repo.
2. Copy example env: `cp .env.example .env` and set values.
3. Install dependencies: `npm install`
4. Start: `npm start`

Files added by the scaffold:
- index.js — minimal bootstrap to start the bot
- plugins/ — folder for plugin modules (see example)
- .gitignore — Node + Baileys session ignores
- LICENSE — MIT license
- .env.example — example environment values

Notes:
- This repo uses ES modules (package.json contains "type": "module").
- Use Node.js 18+ recommended.
- After I push these files I will run quick checks and fix any obvious issues.