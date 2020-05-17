---
title: The Best pfSense Packages
categories:
-   Networking
tags:
-   packages
-   pfsense
thumbnail: thumbnail.png
---

pfSense, the great software that it already is, can get even better with 'packages' (plugin, extension etc. whatever you want to call it) available straight from the Package Manager menu. pfSense packages include diagnostics, increased network management capabilities, enhanced security or to extend pfSense's range of services. Here are the pfSense packages that I use personally plus some highly recommended ones as well!

<!-- more -->

## My pfSense Packages

#### HAVP

Built-in antivirus. [HAVP](http://www.server-side.de/) utilises ClamAV to prevents users from downloading viruses while connected to your network. As soon as a virus is detected, HAVP will display a warning page with the virus or spyware it contains.

A problem I've had with HAVP is that it prevents me from downloading Origin games and downloading Java from Oracle. But the fix is easy, add these three lines into the HAVP whitelist.

```
*sun.com/*
*.ea.com/*
*.origin.com/*
```

HAVP warning/error pages are also editable to include company logos or just so the message is a bit prettier. x-way has some very nice templates available on [GitHub](https://github.com/x-way/havp-templates), although they are in a different language.

#### Squid

[Squid](http://www.squid-cache.org/) is a cache which will reduce bandwidth and increase response times by fetching and reusing data. Squid at best for me has about a total average of 0.63% of requests hit the cache - it's not bad but it sucks for a single user. Squid really shines when you have many users on your network browsing similar sites.

#### LightSquid

[LightSquid](http://lightsquid.sourceforge.net/) is a reporting package for Squid (above). LightSquid simply takes the Squid logs and creates reports for every day of the month of which IP addresses are accessing which sites that are cached.

#### Snort

[Snort](https://www.snort.org/) is a free and open source IDS/IPS which analyses packets, searching for specific patterns to detect probes and different types of attacks. It does this all in real-time. Snort for me has done nothing but give false-positives when you just start off. Eventually all the false-positives will be white-listed and Snort will simply sit back and wait until there is an attack. It wasn't detected anything for the last two months (which is good right?!).

#### pfBlocker

[pfBlocker](https://doc.pfsense.org/index.php/Pfblocker) is like Ad blocker except it blocks IP addresses. It works similar to ad block where it blocks based on lists provided by the community. If only it could be used to block ads as well. Lists are provided from Spamhaus, DShield, iBlockList and more. It also can update your lists periodically as you set.

#### OpenVPN Client Export

[OpenVPN](https://openvpn.net) Client Export provides a very easy method to export VPN connection configurations for Windows, Mac, Android and iOS. It recognises which hostnames, dynamic dns addresses set in pfSense and which remote access server you wish to use. Overall a pick of the bunch when it comes to pfsense packages, it just works!

## Other pfSense Packages

*   [Sarg](http://sourceforge.net/projects/sarg/): similar to LightSquid but also provides information on Squidguard or Dansguardian (below).
*   [Suricata](http://suricata-ids.org/): similar to Snort, a IDS IPS engine.
*   [SquidGuard](http://www.squidguard.org/) or [Dansguardian](http://dansguardian.org/): a very popular package which filters URLs . Bans sites from being accessed, good for families.
*   [Darkstat](https://unix4lyfe.org/darkstat/) or [Bandwidthd](http://bandwidthd.sourceforge.net/): network statistics
*   [Anyterm](http://anyterm.org/): terminal inside pfSense
*   [Avahi](http://avahi.org/): Bonjour-esque service, but requires its own client
