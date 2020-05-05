---
author: Calvin Bui
comments: true
date: 2019-05-15 00:00:00 +1000
layout: post
slug: my-ansible-roles
title: My Ansible Roles
categories:
- Server
image: /assets/images/2019-05-15-my-ansible-roles/featured-image.jpg
images: /assets/images/2019-05-15-my-ansible-roles/
---

A collection of Ansible roles I wrote to automate installation and configuration of my homelab.

<!-- more -->

# Why use my roles?
- I use `arg splatting` most of the time so you can easily provide your own arguments to different modules
- Full documentation provided
- Tested using [Ansible Molecule](https://github.com/ansible/molecule)
- Tested weekly automatically using automated [Travis CI](https://travis-ci.com/)
- Semantic versioning
- Shared on Ansible Galaxy
- Open-source on GitHub
- Issue tracker on GitHub for bugs and requests
- 5/5 scores on Ansible Galaxy

# Roles
You can easily find a list of all my roles on [Ansible Galaxy](https://galaxy.ansible.com/calvinbui)

## Databases
- [MongoDB](https://galaxy.ansible.com/calvinbui/ansible_mongodb)
- [PostgresDB](https://galaxy.ansible.com/calvinbui/ansible-postgres)
- [PostgresDB (docker)](https://galaxy.ansible.com/calvinbui/ansible-postgres-docker)

## Software
- [Ansible AWX](https://galaxy.ansible.com/calvinbui/ansible_awx)
- [Confluence (deprecated)](https://galaxy.ansible.com/calvinbui/ansible-confluence)
- [Confluence (docker)](https://galaxy.ansible.com/calvinbui/ansible-confluence-docker)
- [Docker](https://galaxy.ansible.com/calvinbui/ansible_docker)
- [Docker Network](https://galaxy.ansible.com/calvinbui/ansible_docker_network)
- [Git](https://galaxy.ansible.com/calvinbui/ansible_git)
- [Java](https://galaxy.ansible.com/calvinbui/ansible_java)
- [jDownloader 2](https://galaxy.ansible.com/calvinbui/ansible_jdownloader_docker)
- [Network UPS Tools](https://galaxy.ansible.com/calvinbui/ansible_nut)
- [Portainer](https://galaxy.ansible.com/calvinbui/ansible_portainer)
- [qBittorrent (docker)](https://galaxy.ansible.com/calvinbui/ansible_qbittorrent_docker)
- [Unifi Controller](https://galaxy.ansible.com/calvinbui/ansible-unifi)
- [Unifi Controller (docker)](https://galaxy.ansible.com/calvinbui/ansible_unifi_docker)
- [Watchtower](https://galaxy.ansible.com/calvinbui/ansible_watchtower)
- [XSIBackup](https://galaxy.ansible.com/calvinbui/ansible_xsibackup)

## Monitoring
- [Datadog Agent](https://galaxy.ansible.com/calvinbui/ansible_datadog)

## System
- [APT](https://galaxy.ansible.com/calvinbui/ansible_apt)
- [Authorized Keys](https://galaxy.ansible.com/calvinbui/ansible_authorized_keys)
- [NFS Client](https://galaxy.ansible.com/calvinbui/ansible_nfs_client)
- [NodeJS](https://galaxy.ansible.com/calvinbui/ansible_nodejs)
- [Python pip](https://galaxy.ansible.com/calvinbui/ansible_pip)

## Usenet
- [CouchPotato (docker)](https://galaxy.ansible.com/calvinbui/ansible_couchpotato_docker)
- [NZBGet (docker)](https://galaxy.ansible.com/calvinbui/ansible_nzbget_docker)
- [NZBHydra2 (docker)](https://galaxy.ansible.com/calvinbui/ansible_nzbhydra_docker)
- [Organizr 2 (docker)](https://galaxy.ansible.com/calvinbui/ansible_organizr_docker)
- [Sonarr (docker)](https://galaxy.ansible.com/calvinbui/ansible_sonarr_docker)

## Web
- [ACME certificates](https://galaxy.ansible.com/calvinbui/ansible_acme_certificates)
- [htpasswd](https://galaxy.ansible.com/calvinbui/ansible_htpasswd)
- [Traefik](https://galaxy.ansible.com/calvinbui/ansible_traefik)

# Using Ansible Galaxy

[Ansible Galaxy](https://galaxy.ansible.com/home) is a website for finding, sharing and downloading community developed Ansible roles.

To install roles from the command line, you can run:

`ansible-galaxy install username.role_name`

To install roles from a roles file (recommended) in your playbook, use

`ansible-galaxy install -r requirements.yml`

An example of a `requirements.yml` file:

```yaml
---

- src: calvinbui.ansible_pip
  version: '2.0.0'

- src: calvinbui.ansible_docker
  version: '1.1.1'

- src: calvinbui.ansible_git
  version: '1.1'

- src: calvinbui.ansible_nodejs
  version: '2.0.0'

- src: calvinbui.ansible_datadog
  version: '1.0.2'
```
