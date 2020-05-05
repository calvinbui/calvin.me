---
author: Calvin Bui
comments: true
date: 2014-09-09 23:00:53+00:00
layout: post
slug: quick-how-to-decrease-ipmi-fan-threshold
title: 'Decrease Supermicro IPMI Fan Threshold'
categories:
- How-To
- Server
tags:
- how to
- ipmi
- supermicro
image: /assets/images/2014-09-09-quick-how-to-decrease-ipmi-fan-threshold/featured-image.jpg 
images: /assets/images/2014-09-09-quick-how-to-decrease-ipmi-fan-threshold/
---

I like quiet (slow) fans. I like Supermicro's X10SL7 motherboard. I like how I get email notifications from the IPMI when something is wrong. I do not like how I get warnings because the IPMI fan threshold is 900 RPM. The bad thing is this is not directly configurable through the IPMI user interface or client. That's where we need [IPMITOOL ](http://sourceforge.net/projects/ipmitool/files/)tool to let us lower this annoying little warning.

<!-- more -->

**1.** Install IPMITOOL on a Linux machine on the same network as your IPMI. This is possible via command line or manually downloading it. I used Ubuntu 14.04.

```terminal
$ sudo apt-get install ipmitool
```

**2.** Run the command

```terminal  
$ ipmitool -I lan -U ADMIN -H 10.0.0.4 sensor thresh FAN1 lower 150 225 300
```

Replacing:

  * _ADMIN_ with the IPMI username
  * _10.0.0.4_ with your own IPMI address
  * _FAN1_ with the desired FAN (FANA, FAN1, FAN2, FAN3, FAN4)
  * _150_ with the lower non-recoverable value
  * _225_ with the lower critical value
  * _300_ with the lower non-critical value

**3.** Reboot the machine if necessary (most likely)

{% include caption.html path="capture1.png" caption="Lowered the threshold down to 200 RPM" alt="ipmi-new-threshold" %}

If that doesn't work, there are other tools you can try out. None of these seemed to work for me on Windows or Linux, they just froze. Doing this before install ESXi would've been easier as it would connect directly to the IPMI instead of having to go through the LAN. The worst thing about these is that documentation is there but in a glossary format so you have to read the whole thing to understand it, there aren't little guides for just connecting or changing specific features.

  * [IPMIUTIL](http://ipmiutil.sourceforge.net/): Comes in Windows as well. Needs some Intel/Windows IPMI drivers I could never figure out.
  * [FreeIPMI](http://www.gnu.org/software/freeipmi/): The most popular IPMI utility. Also the most confusing to me.
  * [OpenIPMI](http://openipmi.sourceforge.net/): I didn't try this one out, but there's always this option if the others don't work.

Credits: karpr2 @ http://forums.nas4free.org/viewtopic.php?f=60&t=5739
