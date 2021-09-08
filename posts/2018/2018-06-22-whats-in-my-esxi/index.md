---
title: What's In My ESXi
categories:
- Virtualisation
- Computers
tags:
- vmware
- esxi
# https://www.iconfinder.com/icons/4417095/mount_rack_server_icon
thumbnail: thumbnail.svg
---

Four years have past since I build my home lab! I thought I'd share what virtual machines I'm currently rolling and what I've left behind in that time.

<!-- more -->

## pfSense

> pfSense is a free and open source firewall and router that also features unified threat management, load balancing, multi WAN, and more.

[pfSense](https://www.pfsense.org/) has worked really well for me over the last 4 years. I love its flexibility to micromanage my network to stay organised and in complete control of everything that's happening.

One caveat I have is its ability to track users and their usage. Packages such as `ntopng` can help with that but it fills up the entire disk! This is something that's done much better on Sophos or Meraki appliances.

* CPU: 1
* RAM: 512MB
* HDD: 8GB
* Packages:
  * Avahi
  * mailreport
  * Open-VM-Tools
  * openvpn-client-export
  * Service_Watchdog

## FreeNAS

> Free & Open Source unified file and block storage, VM, and Docker system with templates, a self-healing file system, snapshots, and replication.

The world's \#1 storage OS, [FreeNAS](http://www.freenas.org/) provides storage capabilities for my home lab. It's main job is bundling my 6 x 4TB drives together and sharing it throughout the network.

FreeNAS uses ZFS which eats a lot of RAM, preventing me from running a lot of other stuff I would've like to self-host (e.g. Ansible Tower). If I could however, I would give it even more RAM as it'll give me some peace of mind.

Currently on FreeNAS, I'm making use of NFS to share with my \*nix clients and SMB with Windows.

* CPU: 4
* RAM: 16GB
* HDD: 8GB, 6 x 4TB WD Se, 2 x 512GB Samsung 850 Pro

## Pi-hole

> A black hole for Internet advertisements

I've recently spun up Pi-hole as a DNS server for Google Home and Chromecast devices. This was achieved with pfSense's ability to redirect all traffic from Google's DNS servers to the Pi-hole. I haven't had a chance to test if it actually removes ads however, it currently has 400000 queries and 0 have been blocked.

I wouldn't set Pi-hole or any other adblocker network-wide as it could interfere with webpages or applications. I rather control adblocking individually on each host if it requires it.

* CPU: 1
* RAM: 512MB
* HDD: 16GB

## UPS

A VM image that is provided by CyberPanel to use PowerPanel Business Edition, their application that gracefully shuts downs ESXi during a power outage.

* CPU: 1
* RAM: 512MB

## Milestone

> Milestone XProtect video management software (VMS) is powerful and easy to use with a wide array of features for basic to advanced surveillance needs.

My one (sadly) Windows VM that runs my surveillance camera software, Milestone XProtect. I would love to use something...else but there's not much out there in the Linux world that works well (not Zoneminder).

* CPU: 2
* RAM: 4GB

## Usenet

This VM has replaced 6 other virtual machines by making use of Docker! I've previously posted about this in my [previous post](/ansible-usenet-docker) so take a look at that to find out more. I didn’t think that Docker containers would be so light compared to a brand new Ubuntu server install which only uses ~30MB of RAM compared to 512MB+ which I had for each service before.

* CPU: 4
* RAM: 2
* HDD: 100GB

## Old VMs

Here a few VMs I have but no longer use:

* **ADDS**: Windows Active Directory server. After 3.5 years with it, I realised no one else makes use of LDAP auth besides me so started using local users instead
* **Unifi**: Ubiquity's Unifi software. After setting up my Unifi AP AC, there's not much point leaving it running when it could also be configured through a phone app
* **Emby/Plex**: Media management system and transcoder. I rather use an HTPC with [Kodi](https://kodi.tv/)
* **GitLab**: Code repository. Much easier to just store my code on GitHub/GitLab.com
* **MediaWiki**: Wiki. I've moved all my documentation over to [readthedocs](https://readthedocs.org/) as I wrote in [previous post](/personal-wiki-on-the-internet)
* **napp-it**: ZFS Storage provider. FreeNAS just worked better
* **IPAM**: IP Address management. Easier to look at the DNS page in pfSense
* **NTP**: A time server. pfSense provides NTP services too so this was surpass.
