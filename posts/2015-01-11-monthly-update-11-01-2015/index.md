---
title: Monthly Update (11/01/2015)
categories:
-   Misc
tags:
-   chromecast
-   distributed switches
-   monthly update
-   nps
-   plex
# thumbnail: thumbnail.png
---

In the monthly update, I bring you what I've been doing throughout the past month in regards to technology, computers and more with links to tutorials and guides.

You will also find what I'm currently interested in for the following weeks. If something doesn’t have a link, I may cover it myself in the future because I couldn't find much about it online.

<!-- more -->

### Replacing JetPack
I saw that Jetpack weighed down this site quite a lot (using P3). I found similar plugins that could do features that I wanted from JetPack.

*   Stats replaced by [Google Analyticator](https://wordpress.org/plugins/google-analyticator/)
*   Monitor replaced by [Monitor.us](Monitor.us) and [Pingdom](https://www.pingdom.com/).
*   Publicize replaced by [NextScripts: Social Networks Auto-Poster](https://wordpress.org/plugins/social-networks-auto-poster-facebook-twitter-g/)
*   Enhanced Distribution replaced with a [Ping List](http://www.zdidit.com/wordpress-ping-list-indexing-post-faster/)
*   Sharing replaced by [Simple Share Buttons Adder](https://wordpress.org/plugins/simple-share-buttons-adder/screenshots/)

### WP-Rocket

I've made a change from W3 Total Cache to [WP-Rocket](http://wp-rocket.me/). It feels too simplistic compared to the myriad of options W3TC gave me, but it's simple and it works. W3TC always slowed down my site (oddly the opposite of its job) so this is a nice difference.

### NPS as RADIUS Server.

To allow for 802.1X (combined with WPA2-Enterprise security), my Ubiquiti UniFi controller asked for a RADIUS server. At first I wanted to set up [FreeRADIUS](freeradius.org) but that was more trouble than it was worth so I decided to throw it all together within my domain controller using the Network Policy Server feature.

### Voucher system on Captive Portal

I've switched over to a voucher system on pfSense from the previous login system for my Guest network/VLAN. Although it's more limited than I thought it would be (and a little confusing too), it's done the job so far.

### Only allowed specific ports on different VLANs.

After reading (again) and convincing myself of the dangers of UPnP, I had to lock down the ports that users on my network were accessing.

I made a port alias on pfSense which will be open.

[![](ports.png)](rules.png)

[![](rules.png)](rules.png)

### Created an OU in the Users Group

In additional, created a Global Security Group which works where the Container does not (e.g. when the member attribute is required instead of memberOf).

Active Directory CNs and OUs still confused me but this ensures my fake/connection accounts (e.g. gitlab, vmware, pfsense connections to the ldap) are not usable as logins.

GitLab required an upgrade to 7.5 which allowed User/Group based filtering.

Guide: [http://www.robinhobo.com/how-to-create-container-objects-in-active-directory-not-ous/](http://www.robinhobo.com/how-to-create-container-objects-in-active-directory-not-ous/)

[![](vmware1.png)](vmware1.png)

[![](GitLab.png)](GitLab.png)

[![](mediawiki1.png)](mediawiki1.png)

[![](nginx1.png)](nginx1.png)

[![](pfsense1.png)](pfsense1.png)

### N40L now running ESXi

Shame it does not support vMotion with my current server as runs AMD instead of Intel.

Put an IBM M5016 card in which connects directly with the SAS connection already used by the N40L

Updating the card was a pain! Downloading the official IBM firmware and trying it out on CentOS, RHEL and Windows all failed saying it wasnt meant for my system (im guessing it was looking for an IBM Server). The solution (after a long day) was to download the corresponding firmware from LSI along with their StorCLI tool and flash the firmware directly.

### Moved to Distributed Switches from Standard vSwitches.

This is a pain as all of my infrastructure has already been set up.
Had to get the N40L to run vCenter to edit the settings on the other host. Cannot edit it with vCenter running on it even with options selected.

### Chromecast

Got a Chromecast for Christmas. As my monitors don't have speakers, I plugged it directly into my Yamaha RX-V475 receiver which has a couple of HDMI inputs and one HDMI out going into monitor.

Using the Chromecast to watch videos late at night when I don't want to turn on my PC.

### Got a Plex server setup.

I always thought Plex server was nothing more than a bunch of menus that pushed media to your devices. I was wrong. Plex also includes a built-in web player (awesome!) that transcodes videos on the fly. Also working great with my Chromecast!

### Currently Interested In:

*   Running the UniFi Controller on Linux instead of Windows
*   Getting Spacewalk to work with Debian/Ubuntu
*   Fixing my resume for graduate roles!
