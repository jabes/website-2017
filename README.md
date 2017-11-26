# Website 2017

Personal website where I showcase some of my work.

## Prerequisites

The app requires [Node.js](https://nodejs.org/en/download/) `6.9.0` or higher to be installed before you can install.

```bash
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## How to install

```bash
git clone https://github.com/jabes/website-2017.git
cd website-2017
npm install
```

## Production Server

This will bind to all available addresses `0.0.0.0` on port `80`.

1. First build from source `npm run build:prod`
2. Then run the http server `npm run server:prod`

## Development server

The app will automatically reload if you change any of the source files.

1. Run `npm run server:dev` for a dev server
2. Navigate to `http://localhost:4200/`

## Screenshots

![](screenshot.png)
