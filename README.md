# creativework.pro

Website repository for creativework.pro. This repository contains the source code and assets for the creativework.pro website.

## Overview

The project is currently a small static website with the following main parts:
- An HTML entry point (`index.html`)
- A main stylesheet (`style.css`)
- Node package metadata (`package.json`, `package-lock.json`) for tooling or future build steps
- Additional markdown notes (`test.md`) and a `tests/` directory reserved for testing or experiments

## Tech stack

- **HTML5** — structure and content of the website (`index.html`)
- **CSS3** — styling and layout (`style.css`)
- **Node.js + npm** — used for dependency management and tooling via `package.json` / `package-lock.json`

Currently the site is implemented as a static frontend without a backend server component; it can be served by any static file server or directly via GitHub Pages or similar hosting.
