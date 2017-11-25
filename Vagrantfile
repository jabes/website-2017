# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  # Every Vagrant development environment requires a box.
  # You can search for boxes at https://atlas.hashicorp.com/search
  config.vm.box = "ubuntu/xenial64"
  config.vm.hostname = "website-2017.dev"

  # Disable automatic box update checking.
  # If you disable this, then boxes will only be checked for updates when the user runs: `vagrant box outdated`.
  config.vm.box_check_update = false

  # Create a private network, which allows host-only access to the machine using a specific IP.
  config.vm.network "private_network", ip: "192.168.2.10"

  # Share an additional folder to the guest VM.
  # The first argument is the path on the host to the actual folder.
  # The second argument is the path on the guest to mount the folder.
  # And the optional third argument is a set of non-required options.
  config.vm.synced_folder "./dist", "/var/www/website-2017", :mount_options => ["dmode=777", "fmode=666"]

  # Provider-specific configuration so you can fine-tune various backing providers for Vagrant.
  # These expose provider-specific options.
  config.vm.provider "virtualbox" do |v|
    v.name = config.vm.hostname
    v.customize ["modifyvm", :id, "--memory", 1024]
    v.customize ["modifyvm", :id, "--cpus", 1]
    v.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
    v.customize ["modifyvm", :id, "--natdnsproxy1", "on"]
  end

  # Install python for ansible.
  config.vm.provision "shell", inline: <<-SHELL
    test -e /usr/bin/python || (apt-get -yq update && apt-get install -yq python-minimal)
  SHELL

  # Enable provisioning with a shell script.
  # Additional provisioners such as Puppet, Chef, Ansible, Salt, and Docker are also available.
  config.vm.provision "ansible" do |a|
    a.limit = "web"
    a.compatibility_mode = "2.0"
    a.config_file = "ansible/ansible.cfg"
    a.playbook = "ansible/playbook.yml"
    a.inventory_path = "ansible/inventories/local"
    a.vault_password_file = "~/.ansible-vault/website-2017"
  end

end
