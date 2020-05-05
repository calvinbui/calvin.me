---
author: Calvin Bui
comments: true
layout: post
slug: updates-to-ansible-usenet-docker
title: Updates to Ansible Playbook for Usenet Docker containers
categories:
- Computers
- Linux
- Virtualisation
- Server
- Usenet
image: /assets/images/2017-05-07-ansible-usenet-docker/featured-image.jpg
images:  /assets/images/2017-05-07-ansible-usenet-docker/
---

Up to date practices, new services, monitoring, logging, backups and heap of other improvements.

<!-- more -->

*Read about the playbook in my [previous post]({{ site.baseurl }}{% post_url 2017-05-07-ansible-usenet-docker %})*

**Find the update over at [GitHub](https://github.com/calvinbui/ansible-usenet-docker/releases/tag/3.0)**

Back in May, I developed an Ansible Playbook that deployed my Usenet environment in Docker containers. It deployed all the popular services like NZBHydra, Sonarr and CouchPotato in a repeatable, configurable and predictable manner thanks to Ansible and Docker.

## Traefik

Goodbye to NGINX and docker-gen restarting it. [Traefik](https://traefik.io/) is a reverse proxy and load balancer that is built for microservices. It configures itself automatically and dynamically. The only thing required is to put a URL label on your Docker containers and Traefik will do the rest. It also automatically generates Let's Encrypt SSL certificates!

## New Services

Hello to [JDownloader](http://jdownloader.org/) and [NZBHydra2](https://github.com/theotherp/nzbhydra2). Both have been a treat to work with.

## Agnostic Configurations

I made configuring all the services agnostic to updates by utilising `lineinfile` and `blockinfile`. This way, if a new feature is released and the playbook runs again, only specific lines are replaced instead of the entire configuration which was previously done using [Jinja](http://jinja.pocoo.org/).

## Backups

For cases where agnostic configurations can't be utilised (e.g. Sonarr's database), the `docker-backup` container will backup all data daily to any location specified. It's defaulted to keep only only the last 4 daily backups.

## Logging and Monitoring

[Logz.io](https://logz.io) and [Datadog](https://www.datadoghq.com/) both provide free monitoring and logging services which are more than adequate to track the services deployed. Both of their containers are included and are easily configurable.
