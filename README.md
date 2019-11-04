# Website 2017

Personal website where I showcase some of my work.

## Prerequisites

[Node.js](https://nodejs.org/en/download/) JavaScript runtime built on Chrome's V8 JavaScript engine.

```bash
sudo apt-get install nodejs
sudo pacman -S nodejs
```

## How To Install

```bash
git clone git@github.com:jabes/website-2017.git
cd website-2017
npm install
```

## Production Server

This will bind to all available addresses `0.0.0.0` on port `80`.

1. First build from source `npm run build:prod`
2. Then run the http server `npm run server:prod`

## Development Server

The app will automatically reload if you change any of the source files.

1. Run `npm run server:dev` for a dev server
2. Navigate to `http://localhost:4200/`

## Deploy Updates To Github Pages

```bash
npm run deploy
```

## Screenshots

![](screenshot.png)
