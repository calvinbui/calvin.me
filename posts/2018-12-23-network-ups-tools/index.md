---
title: Network UPS Tools
categories:
-   Computers
tags:
-   nut
-   ups
thumbnail: thumbnail.png
---

Notify servers of network power loss so they begin shutting down.

<!-- more -->

# CyberPower UPS

I recently bought a [CyberPower OR600ELCDRM1U](https://www.cyberpower.com/au/en/product/sku/or600elcdrm1u) UPS as my previous one was not rack-mountable. The unit is dead quiet and short depth which are my reasons for buying it. It holds 600Va which I've found is enough for 3 servers and a PoE+ switch to shutdown within 5 minutes.

![](ups-front.jpg)

![](ups-sidemounts.jpg)

![](ups-rack.jpg)

# Network UPS Tools

My previous UPS was connected to my [all-in-one ESXi host](/all-in-one-esxi-server) using CyberPower's PowerPanel software. This worked at the time as I only had one server to power down.

[Network UPS Tools (NUT)](https://networkupstools.org/) is a software similar to CyberPower's PowerPanel except it works across multiple devices in a master-slave (server-client) architecture.

NUT has a [very long compatibility list](https://networkupstools.org/stable-hcl.html). My device is not official supported but it is equivalent to the [OR700LCDRM1U](https://networkupstools.org/ddl/Cyber_Power_Systems/OR700LCDRM1U.html) which CyberPower also sell in USA.

# Configuration and Deployment

## Master
NUT system requirements are very small. I got it running on a Ubuntu 18.04 LTS server with 1 CPU, 256MB RAM and 16GB of storage.

I created an Ansible role to deploy it. It can be found on my [GitHub](https://github.com/calvinbui/ansible-nut)

There is a very important setting that's not default to not turn off the entire UPS. Disabling the `SHUTDOWNCMD` and `POWERDOWNFLAG` setting ([like I've done here](https://github.com/calvinbui/ansible-nut/commit/452eb0eed0d31462419afc75e5a3448f967c07ee)) will prevent that.

## Slaves

### ESXi

Rene Margar has created a NUT client for ESXi (works for me on 6.7U1). [It can be found from his website](http://rene.margar.fr/2012/05/client-nut-pour-esxi-5-0/).

![](esxi-nut.png)

### FreeNAS

FreeNAS comes with the NUT client under it's Services menu.

![](freenas-nut.png)

### OPNsense

OPNsense comes with the NUT client under it's Services menu.

![](opnsense-nut.png)
