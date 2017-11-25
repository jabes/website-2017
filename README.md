# Website 2017

Personal website where I showcase some of my work.

## Requirements

The following programs must be install on your machine before you may install.

- [Vagrant](https://www.vagrantup.com/downloads.html) 2.0.x
- [VirtualBox](https://www.virtualbox.org/wiki/Downloads) 5.2.x
- [Ansible](http://docs.ansible.com/ansible/latest/intro_installation.html) 2.4.x

## How To Install

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
