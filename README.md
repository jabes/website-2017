# Website 2017

Personal website where I showcase some of my work.

## Requirements

The following programs must be install on your machine before you may install.

- [Vagrant](https://www.vagrantup.com/downloads.html) 2.0.x
- [VirtualBox](https://www.virtualbox.org/wiki/Downloads) 5.2.x
- [Ansible](http://docs.ansible.com/ansible/latest/intro_installation.html) 2.4.x

## How to install

#### 1. Clone the project repo:
    
```bash
git clone https://github.com/jabes/website-2017.git
cd website-2017
```

#### 2. Copy the Ansible key into the vault:
  
**IMPORTANT:** The key below is for the localhost environment only.
Make sure that you use a different secret key for production environments.

```bash
mkdir -p ~/.ansible-vault
echo "SuperSecretPassword" > ~/.ansible-vault/website-2017
```

You can now view secret info using Ansible vault commands:

```bash
cd ansible
ansible-vault view inventories/local/group_vars/secrets.yml
```

#### 3. Fetch required Ansible packages:

```bash
cd ansible
ansible-galaxy install -r requirements.yml
```

#### 4. Download and provision the server:

**NOTE:** The boxes are pretty large and provisioning can take a while.
This is a good time to take a coffee break.

```bash
vagrant plugin install vagrant-hostsupdater
vagrant box update
vagrant up
```

If everything went well, the web server should now be accessible at: [http://website-2017.dev](http://website-2017.dev)

#### 5. Install npm dependencies:

```bash
npm install -g @angular/cli
npm install
```

## Development server

Run `ng serve` for a dev server.
Navigate to `http://localhost:4200/`.
The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component.
You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project.
The build artifacts will be stored in the `dist/` directory.
Use the `-prod` flag for a production build.
