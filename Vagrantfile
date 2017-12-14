# -*- mode: ruby -*-
# vi: set ft=ruby :

require 'yaml'

VAGRANTFILE_API_VERSION ||= "2"

confDir = $confDir ||= File.expand_path("vendor/laravel/homestead", File.dirname(__FILE__))
homesteadPath = File.expand_path("Homestead.yaml", File.dirname(__FILE__))

require File.expand_path(confDir + '/scripts/homestead.rb')

Vagrant.require_version '>= 1.9.0'
Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

    settings = YAML::load(File.read(homesteadPath))
    Homestead.configure(config, settings)

    if defined? VagrantPlugins::HostsUpdater
        config.hostsupdater.aliases = settings['sites'].map { |site| site['map'] }
    end

end
