---
title: Block traffic between VLANs on pfSense
categories:
- How-To
- Networking
- pfSense
tags:
- how to
- pfsense
- vlan
tags:
- 
thumbnail: thumbnail.png
---

VLANs are a great way to separate components of your network and to protect important infrastructure from being messed around by others. By default, traffic between VLANs are blocked by the invisible 'block everything' rule at the bottom of the rules list. Sometimes you want a VLAN where users can just browse the Internet and nothing else. You can also setup rules so that you can access everything but no one can access you. VLAN rules are easy. pfSense makes them even easier.

<!-- more -->

## Block Access to the pfSense Web Client

The most important rule first off is to block access to the pfSense web interface where applicable. This is possible by simply blocking the port alone on the various gateways.

First create a new alias containing all the gateways of the various VLANs. Do not leave out your LAN gateway as well (unless it is disabled).

[![pfsense gui access]({{page.images}}34.png)]({{page.images}}34.png)

Make note of your pfSense TCP Port. Mine is currently 443 but I changed it to 444.

[![pfsense port]({{page.images}}52.png)]({{page.images}}52.png)

Go to the Floating Firewall Rules and create a rule which blocks certain VLANs from accessing the pfSense GUI from its TCP Port.

[![firewall rule]({{page.images}}7.png)]({{page.images}}7.png)

The end result is something like this:

[![6]({{page.images}}62.png)]({{page.images}}62.png)

Test it out by attempting to access the pfSense web interface from a host on the blocked VLAN.

## Internet Only VLAN

An Internet only VLAN is what it says it is - Internet only. Users on this VLAN can access the Internet and nothing else.

Create an alias which contains all RFC 1918 private addresses. RFC 1918 is a standard for private addresses used for homes, offices and mostly any local area networks. Blocking access to private networks would only allow Internet access.

These addresses are:

* 10.0.0.0/8
* 172.16.0.0/12
* 192.168.0.0/16

[![rfc 1918]({{page.images}}8.png)]({{page.images}}8.png)

Create the following VLAN rules for the Internet Only VLAN:

1. Any host on the Guest network **CANNOT** access the Admin network (this is a rule to ensure guests cannot access my infrastructure no matter what - redundant but safer this way)
2. Any host on the Guest network **CAN** access the gateway (this is what provides Internet access)
3. Any host on the Guest network **CANNOT** access any private addresses. (this blocks all access to anything on the local area network).
4. Any host on the Guest network **CAN** access anything. (this last rule enables Internet access)

[![internet only]({{page.images}}9.png)]({{page.images}}9.png)

## Admin VLAN

An administrative VLAN with access to anyone and anything it wants. Just create a rule where anything on this network can access everything else.

[![admin vlan]({{page.images}}101.png)]({{page.images}}101.png)

## Private No-Internet VLAN

More or less a local area network without Internet access. Hosts on this network can interact with one another but nothing more. Good environment for testing with no Internet access or access to other VLAN in case it is a virus.

1. Any host on the this network **CANNOT** access the Admin network (this is a rule to ensure guests cannot access my infrastructure no matter what - redundant but safer this way)
2. The network can communicate with itself.
3. This network cannot communicate with anything.

[![local vlan]({{page.images}}111.png)]({{page.images}}111.png)
