---
title: Deploy Docker containers for Usenet using Ansible
categories:
-   Computers
tags:
-   ansible
-   usenet
-   docker
# thumbnail: thumbnail.png
---

I made a Ansible playbook to deploy Docker containers containing Usenet applications.

<!-- more -->

# Update

You can find my new playbook (and the roles they refer to) on GitHub at https://github.com/calvinbui/usenet-playbook

## Overview

Ansible and Docker are two technologies I started learning this year. As I used them at work, I started getting ideas of how to put them into practice at home in my environments.

For a really basic, simple overview:

-   Docker: running apps in isolated containers
-   Ansible: automate tasks on a remote machine
-   Usenet: worldwide distributed system on the Internet for discussion (and sharing)

## Ansible Playbook

Putting all three together, I came up with an Ansible playbook that installs my Usenet services in Docker containers on a Ubuntu server. Each Usenet service is contained in its own Ansible role.

The following roles are available:

-   [NZBGet](https://nzbget.net/): Usenet download
-   [Transmission](https://transmissionbt.com/): Bittorrent client
-   [NZBHydra](https://github.com/theotherp/nzbhydra): Meta search for NZB Indexers
-   [Sonarr](https://sonarr.tv/): Smart PVR for newsgroup and bittorrent users
-   [Radarr](https://radarr.video/): A fork of Sonarr to work with movies
-   [CouchPotato](https://couchpota.to/): Automatic Movie Downloading via NZBs & Torrents
-   [Muximux](https://github.com/mescon/Muximux): Lightweight portal to view & manage your webapps
-   [Organizr](https://github.com/causefx/Organizr): HTPC/Homelab Services Organizer - Written in PHP

The playbook installs the services (roles) above as well as performing other tasks:

1.  Sets up a brand new machine (Ubuntu 16.04+) by making sure its up to date and has VMware Tools.
2.  Installs and configures Docker for our purposes (e.g. docker networking, docker-py).
3.  Mounts an NFS network share to store downloads.
4.  Downloads and runs the Docker containers for NZBGet, Transmission, NZBHydra, Sonarr, Radarr and/or CouchPotato.
5.  Installs NGINX with LDAP authentication to proxy these services to the Internet.
6.  Installs Muximux or Organizr to provide easy access to those services.
7.  Generate certificates using Let's Encrypt on the Docker host (not container) and links the certificates to the sites.
8.  Installs [Watchtower](https://hub.docker.com/r/v2tec/watchtower/) to update Docker images automatically if there are changes.
9.  Adds [Backstroke](https://backstroke.us) links to crontab. Problematic images that have been forked and edited (NZBGet and Transmission change owners on my NFS shares), [Backstroke](https://backstroke.us) keeps their repositories up to date with their respective upstreams.

## Automatically Updating Images

[Watchtower](https://hub.docker.com/r/v2tec/watchtower/) is used to monitor running Docker containers and watch for changes to the images that those containers were originally started from. If Watchtower detects that an image has changed, it will automatically restart the container using the new image.

For problematic images that have been forked and edited (NZBGet and Transmission images run chown commands on my NFS shares), [Backstroke](https://backstroke.us) keeps their repositories up to date with their respective upstreams. A cron job is created to lookup new changes and raise pull requests if there are any changes. From here, Docker Hub will automatically build the new image as it is a service linked in GitHub.

## Benefits and Value

To list them:

-   I have been able to reduce the amount of virtual machines from 6 to 1
-   Separation of concerns still possible with Docker containers
-   Memory usage on VMware down from 3.5GB to 1.5GB (could get away with 1GB in my tests)
-   I didn't think that Docker containers would be so light compared to a brand new Ubuntu server install which only uses ~30MB of RAM by default
-   Idempotent installation. I can run the playbook over and over again without having to reconfigure anything in each app (minus Sonarr and CouchPotato which uses a database)

## Try it out

You can find the playbook here: [https://github.com/calvinbui/ansible-usenet-docker](https://github.com/calvinbui/ansible-usenet-docker) with some additional documentation.

The playbook at the moment is specific to myself (i.e. I'm proxying another one of my websites) but can be easily changed to match anyone's setup.

### Post updates

10/06/2017: Improved post wording and added new functionality
