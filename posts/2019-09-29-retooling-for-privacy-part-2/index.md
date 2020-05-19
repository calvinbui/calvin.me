---
title: Retooling for Privacy Part 2
categories:
-   Security
-   Privacy
tags:
-   google
-   nextcloud
-   piwigo
-   xbrowsersync
-   snips
-   hauk
thumbnail: thumbnail.png
---

More I've done for my online privacy since my [previous post](/retooling-for-privacy).

<!-- more -->

There were a few areas I in my last post that has not been addressed. This has been an on-going project for myself and so I have been looking into alternatives for those products.

A big change from before has been the inclination to self-host which has been put aside. I have to trust my servers since I built them. Monitoring and alerting is also now done in a top-down approach (ports open, the app running) rather than bottom only (server online, free disk space, CPU and memory usage).

These are the areas I have changed since last time:

- Cloud Storage
- Collaborative Document Editing
- Google Photos
- Chrome Bookmarks
- Password Manager
- Google Home
- Google Pay
- Android Auto
- Android Phone
- Location Sharing

## Cloud Storage

Previously I was using Dropbox, then moved to **[Cryptomator](https://cryptomator.org/)** with Dropbox to make use of all my free space. I got a bit tired of having to encrypt the entire Dropbox directory and decided to run my personal cloud storage server with [**Nextcloud**](https://nextcloud.com/).

I have [shared my 72TB FreeNAS server before](/my-72tb-freenas-server) and thought it would better to keep everything in there instead of keeping certain things separately as I did with Dropbox.

Nextcloud provides a complete self-hosted productivity platform but I won't be focussing on that. There's an [External Storage](https://docs.nextcloud.com/server/16/admin_manual/configuration_files/external_storage_configuration_gui.html) feature which allows for a lot of different backends such as SMB/CIFS, FTP and cloud providers. This mounts the share as a folder in Nextcloud natively so files and folders can be created, viewed and edited just as if they were any other.

![](nextcloud-ext-storage.PNG)

Combine that with a web browser, mobile phone or their desktop applications and I can easily access and even sync files back and forth from my devices to Nextcloud.

![](nextcloud-freenas.PNG)

![](nextcloud-mac.png)

![](nextcloud-phone.jpg)

## Collaborative Document Editing

Another feature of Nextcloud is support for [**Collabora**](https://www.collaboraoffice.com/) and [**OnlyOffice**](https://www.onlyoffice.com/), two separate collaborative document editing suites.

I have set up both as Docker containers next to the Nextcloud container and they integrate seamlessly through their respective plugins. I can't say which I like more, but both are pretty good at what they do. Collabora is the only one that works on mobile for me a the moment.

## Google Photos

Free unlimited photo backup is something I may never find. Combine that with a very good search feature for different people, places and things. For nowm I have made do with [**Nextcloud**](https://nextcloud.com/) combined with [**Piwigo**](https://piwigo.org/).

With its multitude of features, I can connect to my FreeNAS server (previous section) and perform automatic photo and video uploads from my phone using the official app. In the upload settings, there's an option to 'use subfolders' which will create a YEAR/MONTH folder hierarchy.

![](nextcloud-upload-phone.jpg)

To view photos, I spun up Piwigo which is an open-source photo gallery software. Viewing photos on Nextcloud however horrendous. Piwigo's interface is better, but not the best. There are millions of plugins for it which slightly improve it but it's still far away from what you can expect with Google Photos.

![](piwigo.PNG)

Piwigo does not automatically load new photos from Nextcloud. New items must be synchronised which is a very intensive task if done incorrectly. After setting up my synchronisation settings, I updated [this Perl script](https://github.com/calvinbui/piwigo-playbook/blob/master/files/piwigo_refresh.pl) to be run by cron each hour to perform a sync with Nextcloud.

To finish it off, I have the following plugins installed:

- Admin Tools
- gdThumb
- LocalFiles Editor
- OpenStreetMap
- RV Thumb Scroller
- VideoJS

For the theme, I'm using Bootstrap Darkroom.

## Chrome Bookmarks

My bookmarks are really important to me as I use them across all my devices. [**XBrowserSync**](https://www.xbrowsersync.org/) is the best solution I've found with native support in Chrome/Chromium and a mobile app. On mobile, it does not sync directly with your browser (i.e. Bromite, Firefox, Chrome) but if I know what I'm looking for, the app will give me direct access to it. There's not much to write about this so I'll list what I like about it:

- Keeps bookmark order and folder structure
- Free and open-source
- Works in Firefox too
- Plans to sync browser history!

## Password Manager

I was previously using KeePass through Dropbox but with moving to Nextcloud, I changed over to [**Bitwarden**](https://bitwarden.com/) and it has been amazing! I'm running the unofficial server, [bitwarden_rs](https://github.com/dani-garcia/bitwarden_rs), as it's less resource-heavy than the official server.

## Google Home

It was soon after my last post when [news broke that Google workers were listening to what people say](https://www.vrt.be/vrtnws/en/2019/07/10/google-employees-are-eavesdropping-even-in-flemish-living-rooms/). I unplugged my Google Home and set out to look for a more private alternative. The two I found were [Mycroft](https://mycroft.ai/) and [**Snips**](https://snips.ai/)

In my day to day use, I only asked my Google Home two things:

- Turn off/on the smart light
- The weather forecast

With Mycroft, it was slow to respond. I would wait for around 10 seconds for anything back. Their Kickstarter is about a year delayed and they're asking for more money recently as well. Steer clear for now until their Mark II starts shipping.

With Snips, it was better but still required some tweaking and Linux know-how. It was good enough so I went ahead and bought their [official Maker Kit in collaboration with Seeed](https://docs.snips.ai/the-maker-kit/dev-kit).

![](snips.jpg)

Snips has different community created apps that can be installed in your home assistant. These are things like home automation, Wikipedia, calculator and calendar features. For home automation, it directly talks to [**Home Assistant**](https://www.home-assistant.io/) and can also run Home Assistant locally on the same Raspberry Pi.

You can find a [quickly thrown together guide](https://gist.github.com/calvinbui/d3686e748283efbb45507aae63631a6d) I wrote on how to set it up Home Assistant onto the Marker Kit

## Google Pay

Instead of using Google Pay, I've returned to using physical cards. To make it easier, I also bought a thinner wallet, the [**Bellroy Card Sleeve**](https://bellroy.com/products/card-sleeve-wallet). I tried some cheaper alternatives from Aliexpress but the Bellroy is better.

![](bellroy-bottom.jpg)

![](bellroy-side.jpg)

## Android Phone

On my Samsung Galaxy S10+, I went ahead and rooted it using [**Magisk**](https://forum.xda-developers.com/galaxy-s10/development/magisk-root-galaxy-s10-series-t3918699). I don't know why I put it off for so long because I should have done it sooner!

With root, I was able to remove all Google apps and install [**MicroG**](https://microg.org/), 'A free-as-in-freedom re-implementation of Google’s proprietary Android user space apps and libraries.' With MicroG I'm still able to use Google Maps and YouTube (no alternatives to these yet) and receive GCM/Firebase push notifications so most of my required proprietary apps still work. I still find issues with apps that make use of Mapbox (EASI and Dominos so far) and Casting isn't working at all but I can live with that for now.

Along with MicroG, I have installed:

- [AFWall+](https://github.com/ukanth/afwall): A firewall to straight-up block apps from sending/receiving data using iptables.
- [XPrivacyLua](https://github.com/M66B/XPrivacyLua): For apps that I can't block, XPrivacyLua sends them spoofed device information such as location, user accounts, camera and voice recordings.

## Android Auto

My car ([which I have also blogged about](/tech-inside-my-2018-vw-golf-r)) has Android Auto but MicroG (previous section) has no Android Auto implementation. I have purchased a Samsung Galaxy A20 (2019) as 'Android Auto phone' which is always connected to my car. It has all the apps like Waze and Maps and tethers off my Galaxy S10+ (main phone).

![](a20.jpg)

For calls/messages and automatically turning on and off tethering, I plan to buy a [separate hands-free Bluetooth speaker from Aliexpress](https://www.aliexpress.com/item/32818901307.html?spm=a2g0s.8937460.0.0.aee92e0e4V1781).

## Location Sharing

I previously used two apps for Location Sharing, Google Maps and Facebook Messenger. Google Map's implementation required turning on Location History which I never liked. Facebook Messenger is never receiving any location data from me. Browsing through F-Droid, I found [**Hauk by bilde2910**](https://github.com/bilde2910/Hauk). Hauk shares my location through my self-hosted endpoint from data sent from the mobile app.

![](hauk.jpg)

## Conclusion

To summarise the products I've mentioned:

- Cloud Storage: [Nextcloud](https://nextcloud.com/)
- Collaborative Document Editing: [Nextcloud](https://nextcloud.com/) with [Collabora](https://www.collaboraoffice.com/) and [OnlyOffice](https://www.onlyoffice.com/)
- Photos: [Nextcloud](https://nextcloud.com/) and [Piwigo](https://piwigo.org/)
- Bookmarks: [XBrowserSync](https://www.xbrowsersync.org/)
- Password Manager: [Bitwarden](https://bitwarden.com/)
- Voice Assistant: [Snips](https://snips.ai/)
- Payments: Physical cards
- Phone: [Rooted](https://forum.xda-developers.com/galaxy-s10/development/magisk-root-galaxy-s10-series-t3918699), [MicroG](https://microg.org/), [AFWall+](https://github.com/ukanth/afwall) and [XPrivacyLua](https://github.com/M66B/XPrivacyLua)
- Android Auto: Separate phone
- Location Sharing: [Hauk]((https://github.com/bilde2910/Hauk))

I'm close to full privacy without losing too much productivity and efficiency. The main annoyances that remain are:

- Some apps don't work correctly due to MicroG
- No casting supporting from MicroG (on my device)
- Piwigo is not feature-rich as Google Photos
- Separate phone required for Android Auto. Podcasts not always synced.

The next steps are finding alternatives (that don't suck) to:

- Google Maps
- YouTube (with personalised recommendations)
- Spotify
- Facebook Messenger
