---
author: Calvin Bui
comments: true
date: 2014-09-24 00:43:05+00:00
layout: post
slug: create-ntp-server-using-ubuntu-14-04
title: Create an NTP Server using Ubuntu 14.04
categories:
- How-To
- Linux
- Networking
tags:
- how- to
- linux
- ntp
- ubuntu
image: /assets/images/2014-09-24-create-ntp-server-using-ubuntu-14-04/featured-image.jpg 
images: /assets/images/2014-09-24-create-ntp-server-using-ubuntu-14-04/
---

Network Time Protocol (NTP) is a networking protocol for time and date synchronisation between computers. By default, Windows 7 provides five servers (default being time.windows.com) to synchronise with. Time varies based on network latency however with tens of milliseconds over the Internet and almost one millisecond on LAN. Having a NTP server also reduces the amount of calls to the Internet made by hosts and achieves a better system time for all computers that rely on performance, integration and timeliness. Luckily a NTP server is very easy to build on Linux.

<!-- more -->

## Prerequisites

* Internet connection
* Ubuntu 14.04
* Networking

## NTP Installation Guide

**1.** Install Ubuntu 14.04 LTS with roughly:

* 1 CPU
* 256MB RAM
* 5GB HDD

This will be all you need.

**2.** Install the NTP daemon using the command:

```terminal
$ sudo apt-get install ntp
```

**3.** Let's configure the NTP servers we are going to retrieve from. Edit the ntp.conf using the command:

```terminal
$ sudo nano /etc/ntp.conf
```

Here are the current servers that the service is currently retrieving the time from:

```config    
server 0.ubuntu.pool.ntp.org
server 1.ubuntu.pool.ntp.org
server 2.ubuntu.pool.ntp.org
server 3.ubuntu.pool.ntp.org
```

This is something you should change to a local/country instead of the Ubuntu pools. You can find this at the [NTP Pool Project](http://www.pool.ntp.org). I will be using the Australian pools so change the lines as necessary:

[![updated servers]({{page.images}}24.png)]({{page.images}}24.png)

Place the word _iburst_ onto one pool to indicate you want to retrieve from this as soon as possible. This causes the daemon to synchronise with this server after starting up, otherwise it will take somewhere up to 20 minutes before the first synchronisation.

**4.** Add a fallback server. Ubuntu already provides their own fallback but we will use the current server's time as the default. Otherwise you can specify any other server you know of:

```config     
server 127.127.1.0
fudge 127.127.1.0 stratum 10
```

[![fallback server]({{page.images}}35.png)]({{page.images}}35.png)

**5.** Your file will look something like this now:

[![config]({{page.images}}43.png)]({{page.images}}43.png)

Hit _CTRL+X_, enter _Y_ to confirm and hit Enter.

**6.** Restart the daemon service using the command:

```terminal    
$ sudo /etc/init.d/ntp restart
```

**7.** Monitor the log to see when it starts synchronising using the command:

```terminal     
$ tail -f /var/log/syslog
```

(Ctrl + C to exit)

[![restart server]({{page.images}}53.png)]({{page.images}}53.png)

**8.** It nothing comes up (which usually happens to me), run the command '_ntpq -p_' and it should show you all the time servers you are currently connecting with. This is enough to know if it is synchronized for now.

```terminal
$ ntpq -p
```

[![polling server]({{page.images}}63.png)]({{page.images}}63.png)

**9.** Find the hostname of the server (_hostname -A_) or its IP address (_ifconfig_) and start synchronising everything!

[![sync with ntp server]({{page.images}}71.png)]({{page.images}}71.png)

[![sync using FQDN]({{page.images}}91.png)]({{page.images}}91.png)

If the hostname does not work, try the IP address. If that works then use '_ipconfig /flushdns_' to clear your cache and make Windows retrieve the hostname from the DNS instead of the cache.
