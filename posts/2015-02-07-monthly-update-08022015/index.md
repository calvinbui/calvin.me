---
title: Monthly Update (08/02/2015)
categories:
-   Misc
tags:
-   monthly update
thumbnail: thumbnail.png
---

In the monthly update, I bring you what I've been doing throughout the past month in regards to technology, computers and more with links to tutorials and guides.

You will also find what I'm currently interested in for the following weeks. If something doesn’t have a link, I may cover it myself in the future because I couldn't find much about it online.

<!-- more -->

## UniFi Controller on Linux

I wrote a [post](/install-unifi-controller-ubuntu/) about it, maybe you should have a read?

## pfSense IGMP Proxy

Does this even work? I'm trying to allow my Chromecast, printer and Plex to be available across VLANs through automatic discovery.

So far, it doesn't seem to be working with any combination of upstreams/downstreams and network addresses. I've also tried Avahi as well.

The best guide I could find is one [written by Cisco](http://www.cisco.com/c/en/us/td/docs/wireless/controller/technotes/7-6/chromecastDG76/ChromecastDG76.html) but is specific to their systems.

## Optimised website

This website has gone through a big overhaul!

The theme has been changed to [Fictive](https://theme.wordpress.com/themes/fictive/) with some custom CSS code I've written to hide the post styles, center the search bar and align any text sidebar widgets.

```css
.hentry:before {
  background-color: rgba(0,0,0,0);
  content: "";
}

.byline {
  display: none;
}

.textwidget > p {
  padding-left: 2em;
}

.search-field {
  width: 120%;
}
```

The theme looks great overall. One wish I could make would be to center the entire theme and have another sidebar on the right.

Furthermore I've added a few new plugins to enhance security and usability such as Wordfence, Scroll Top and reverted back to JetPack.

## Updated ESXi hosts

I thought it was a good time to do some updates. Went straight to 5.5 U2 using the [_update-from-esxi5.5-5.5_update02.zip_](https://my.vmware.com/group/vmware/patch#search) file and the command:

```terminal
$ esxcli software vib update -d=[ZFS0]/esxi_patches/ESXi/update-from-esxi5.5-5.5_update02.zip
```

## Updated pfSense to 2.2 release

You can read about in my other [post](/upgrade-pfsense-2-2-vmware/) as well.

## Digital Ocean hosting for girlfriend

My girlfriend is a veteran blogger but hasn't touched it in a while. Using the [GitHub student pack](https://education.github.com/pack/offers), we were able to get $100 credit on Digital Ocean for hosting on Ubuntu with WordPress preinstalled. Using SSL certificate offer from Namecheap also allowed me to get HTTPS up and running.

## Computer for girlfriend

Currently in the process of building a new computer for my girlfriend. There'll be a post about it soon!

## Facebook Lite

Facebook Lite is awesome. It's like Facebook but much smaller and less battery sucking. Only available on the [Google Play Store](https://play.google.com/store/apps/details?id=com.facebook.lite) in Bangladesh, Nepal, Nigeria, South Africa, Sudan, Sri Lanka, Vietnam, and Zimbabwe for now. You can still [download it here](http://www.apkmirror.com/apk/facebook-2/lite/facebook-lite-1-4-0-6-14-apk/). All the news sites like [CNET](http://www.cnet.com/au/how-to/get-facebook-lite-for-your-android-device/) and LifeHacker link the old version because they probably all copy each other.

## Currently Interested

*   Planning for new computer and SAN storage: When my current PC gets an upgrade, I may retire it as another ESXi host. If I do that, I may also look at getting started on Fibre Channel storage and a proper rack enclosure.
*   Got an Intel I350 T4 NIC as an early Valentine's Day present. Gonna have a lot of fun with it in pfSense doing some bridging and link aggregation.
*   Been playing around with Docker. Looking at the possibility of running SABnzbd, Couch, Sonarr etc. all on one virtual machine to save some memory. Would also be good to learn as a skill.
*   Going to go with Windows 8.1 on all my PCs. 8.1 sucks but can be made a lot better with a bunch of applications like [Start8](http://www.stardock.com/products/start8/) and [ModernMix](http://www.stardock.com/products/ModernMix/). Running things as Administrator is usually a pain but you can get around it by using the Administrator account by default from the very start (not recommended of course).
