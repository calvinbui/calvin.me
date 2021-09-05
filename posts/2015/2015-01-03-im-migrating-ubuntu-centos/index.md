---
title: I'm migrating from Ubuntu to CentOS
categories:
-   Computers
tags:
-   centos
-   ubuntu
thumbnail: thumbnail.png
---

I'm migrating from Ubuntu to CentOS as my main Linux distro. Literally every virtual machine (VM) I've set up so far runs Ubuntu's latest and greatest LTS (14.04 Trusty Tahr) so I won't be manually setting them all up again, only every VM I set up from this point onward. There's a couple of reasons for the change.

<!-- more -->

First off, Ubuntu is great. I really love it.

* It eats less memory than CentOS.
* It doesn't have a minimum installation requirement like CentOS (although you can just decrease it when you finish the installation).
* It has more packages than CentOS.
* It almost always works with any hardware configuration I throw at it.

I'm not hating on Ubuntu, I'm just against it from now on for my own usage - not that I'm telling you to change too. There are just a few niggly things I'm worried about and some decisions Canonical have made which don't bode well with me.

![ubuntu-trusty-320x205](ubuntu-trusty-320x205.jpg)

### Reason 1: Upstart vs Systemd

This is probably the biggest reason for my switch - 14.04 LTS uses [upstart](http://upstart.ubuntu.com/). If you haven't heard, the rest of the Linux world (except a minor few) use [systemd](http://www.freedesktop.org/wiki/Software/systemd/).

The good news is Ubuntu have finally decided to [switch over to systemd](http://www.markshuttleworth.com/archives/1316), except that decision came after 14.04 LTS. The bad news is all my upstart scripts won't rewrite themselves! At the top of my head, SABnzbd, CouchPotato and Transmission use upstart as their startup script! Some of these were hard as hell to get running because of all the user permissions I had to get right.

I'm not clear on how to convert upstart scripts to systemd. I hope it just automagically works as a drop-in replacement but that's almost never ever the case for people like us :disappointed:

I guess this isn't their fault as they follow Debian closely.

### Reason 2: Longterm Kernel

Ubuntu 14.04 uses the 3.13 Linux kernel, not a [longterm version of the Linux kernel](https://www.kernel.org/). Longterm kernels (LTR) are supported for roughly 3 years, where higher stability would be provided than a 'mainline' or newer release. For a 'server' environment, I don't understand why Ubuntu 14.04 LTS went with 3.13 and not the 3.12 LTR.

Apparently Torvalds held off the 3.14 LTR until a week after the [14.04 LTS kernel code freeze occurred](http://www.phoronix.com/scan.php?page=news_item&px=MTY0MjM). Why didn't Ubuntu just wait another week to implement it? Now every new patch release must be manually added and tested by Ubuntu kernel maintainers for the next 5 years...if they even bother. The updates would've gave direct from the official linux kernel if they just went with 3.12 LTR.

![tux](tux.png)

### Reason 3: Landscape costs money! $$$$

[Landscape](http://www.ubuntu.com/management) is Canonical's system management tool for all your Ubuntu hosts. It does everything you would expect from updating/upgrading software (using apt-get and aptitude), host monitoring like when you see CPU usage and warnings; and deployment features for OpenStack and cloud infrastructure.

![imageso_0serverso_0landscape](imageso_0serverso_0landscape.png)

I haven't tried Landscape and I don't plan to because it costs money. Although it has the general 30 day free trial, I rather not be wasting my time because in the end I wouldn't fork out my cash for it.

This is Ubuntu's answer to [Red Hat's Satellite](https://access.redhat.com/products/red-hat-satellite) but there isn't an answer to Red Hat's free alternative: [Spacewalk](http://spacewalk.redhat.com/).

![spacewalk-black](spacewalk-black.png)

System management is tough as it is already (I do it as a job) but without the proper tools it gets a lot harder. Until Ubuntu release a free offshoot there's not much to do except try out other alternatives like [Puppet](http://puppetlabs.com/) and [Chef](https://www.chef.io/chef/).
