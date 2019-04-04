# Website 2017

Personal website where I showcase some of my work.

## Prerequisites

[Node.js](https://nodejs.org/en/download/) JavaScript runtime built on Chrome's V8 JavaScript engine.

```bash
apt-get install -y nodejs
```

[Composer](https://getcomposer.org/download/) Dependency Manager for PHP.

```bash
apt-get install -y composer
```

[Vagrant](https://www.vagrantup.com/downloads.html) Build portable virtual environments.

```bash
apt-get install -y vagrant
```

[VirtualBox](https://www.virtualbox.org/wiki/Downloads) Hypervisor for x86 computers.
```bash
apt-get install -y virtualbox
```

## How to install

```bash
ssh-keygen -f ~/.ssh/id_rsa -t rsa -N ''
git clone https://github.com/jabes/website-2017.git
cd website-2017
npm install
composer install
vagrant box add laravel/homestead
vagrant plugin install vagrant-hostsupdater
vagrant up
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
