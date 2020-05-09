---
title: The Monthly Update (30/11/2014)
categories:
-   Misc
tags:
-   apt-cacher
-   gist
-   havp
-   lifx
-   monitoring
-   monthly update
-   pbx
-   syntax
-   usenet
-   video player
-   wordpress
# thumbnail: thumbnail.png
---

In the monthly update, I bring you what I've been doing throughout the past month in regards to technology, computers and more with links to tutorials and guides.

You will also find what I'm currently interested in for the following weeks. If something doesn’t have a link, I may cover it myself in the future because I couldn't find much about it online.

<!-- more -->

Weekly update becomes fortnightly update becomes monthly update.

### Find myself a Gist

After trying out the projects online:

*   [Gistie](https://github.com/gmarik/Gistie) was a big buggy.
*   [pastgit](https://github.com/mmikulicic/pastgit) didn't work but its so old anyway.
*   [gitpaste](https://github.com/justinvh/gitpaste) was not bad
*   [phorkie](https://github.com/cweiske/phorkie) was the best one!

I plan to use a Gist for scripts I like to update as well as pulling in information via curl/wget (by viewing it raw).

### System Monitoring and Logging

I begin having a thing for system monitoring and logging. As things grew, I wanted to be able to monitor it all - mainly disk usage and any log files it produced. Most solutions required an add-on to be installed onto the host but I found that simply ridiculous...why not specify SSH details and commands to retrieve them? There were a few popular monitoring solutions I encountered:

*   [Nagios](http://www.nagios.org/): the most popular one.
*   [Fully Automated Nagios](http://www.fullyautomatednagios.org/): Nagios but with popular features.
*   [OpsView](http://www.opsview.com/): A paid version of Nagios more or less.
*   [Icinga](https://www.icinga.org/): An open-source monitoring solution
*   [Reimann](http://riemann.io/):
*   [Zabbix](http://www.zabbix.com/): Nagios with an extra layer of stuff
*   [Monit](http://mmonit.com/monit/): Marketed as a simple monitor, but was confusing anyway
*   [PHP Server Monitor](http://www.phpservermonitor.org/): A really half-baked tool. I wasn't sure what he was aiming for.
*   [Statuspage.io](https://www.statuspage.io/): Popular for many website APIs and system status but doesn't do much more
*   [Stashboard](http://www.stashboard.org): Same as StatusPage.io but free.
*   [ELK Stack](http://www.elasticsearch.org/overview/): A bunch of tools put together to log a system. Very light and simple.

### More Usenet Tools

I installed Headphones, NZBMegasearcH and LazyLibarian.

[Headphones](https://github.com/rembo10/headphones) is an automatic music downloader. [NZBMegasearcH](https://github.com/pillone/usntssearch/) is a aggregate search engine which saves me having to visit a bunch of sites to manually search for content. LazyLibarian hasn't been updated in a long time but [DobyTang's fork of the project](https://github.com/DobyTang/LazyLibrarian) continues to keep the project alive. LL is used for downloading eBooks.

I also tried finding an automatic games downloader. The options available, [Gamez by avjui](https://github.com/avjui/Gamez) and [GamezServer by Riveu](https://github.com/Riveu/GamezServer) both didn't work for me :disappointed: I may try again later

### WordPress

Got a few new plugins

*   [UpdraftPlus - Backup/Restore](https://wordpress.org/plugins/updraftplus/): iThemes was unable to backup my site for whatever reason so I opted for something new. Updraft is able to backup everything to my Google Drive as a remote backup.
*   CloudFlare: If you're running WordPress and CloudFlare together, CloudFlare has a [list of recommendations](https://support.cloudflare.com/hc/en-us/articles/201717894-Using-CloudFlare-and-WordPress-Five-Easy-First-Steps) for you.
*   [EWWW Image Optimizer](https://wordpress.org/plugins/ewww-image-optimizer/): EWWW is a local image optimizer compared to Smush which runs on Yahoo!'s website. EWWW is much faster and doesn't suffer downtimes like Smush.
*   [Crayon Syntax Highlighter](https://wordpress.org/plugins/crayon-syntax-highlighter/): I was previously using a very outdated Syntax Highlighter plugin. Crayon is very very good though, it is able to detect languages and the wrapper has a lot of features as well.

I also centered the TwentyFourteen theme. Instructions were found on the [WordPress forum](https://wordpress.org/support/topic/how-to-center-the-whole-site?replies=1), inspiration from [DSOGaming](http://www.dsogaming.com/). I'm very excited for the [TwentyFifteen](https://make.wordpress.org/core/2014/09/09/twenty-fifteen/) theme as well.

Lastly I had a stupid error with JetPack. It kept giving me a 32601 error meaning something was up with my xmlrpc.xml file (nothing was wrong). I was able to fix this by adding the following line to my wp-config.php:

```php
$_SERVER['SERVER_PORT'] = 443;
```

### HAVP templates

I contributed English translations to x-way's HAVP templates. You can find them [here](https://github.com/x-way/havp-templates).

![Screenshot](https://camo.githubusercontent.com/685b256e9994133867c373981a0d1a99c1e4d951/68747470733a2f2f6769742e782d7761792e6f72672f782d7761792f686176702d74656d706c617465732f626c6f622f6d61737465722f73637265656e73686f742e706e673f7261773d74727565)

### Continuous Integration

There were two main CI programs that I took a look at:

*   Teamcity: Found a easy installation guide for Linux but could not integrate it with GitLab.
*   GitLab CI: Integrates with GitLab (under the same name) but requires an extra host as a 'runner'. Installation guide was found [here](https://gitlab.com/gitlab-org/gitlab-ci/blob/master/doc/install/installation.md%20https://gitlab.com/gitlab-org/gitlab-ci-runner/blob/master/README.md).

I can say I don't have a single clue how to even use my CI. I definitely would like to though and decrease my time testing.

### PBX

They were all very interesting PBX systems but in the end my VoIP setup wasn't that big so I deleted them all before getting to the point where I compared them. Instead I migrated from my FritzBox 7390 which was acting as my DECT station and VoIP host to my smaller (and sometimes unreliable but maybe not this time around) Gigaset A510IP. Overall the change would hopefully be more power efficient and fix the issue where it would drop calls after a period of time unless restarted. Interestingly it took a few things to get the Gigaset working. First it blocked anything not on the same network/vlan as itself, I didn't realise this and troubleshooted everything until I found the checkbox under 'Advanced Settings' to turn that off. Next Snort was blocking SIP (a VoIP protocol) but that was taken care of swiftly. Lastly my VoIP account details weren't working but a firmware update fixed that. I love when updates fix stuff. Hopefully Grandma is happier now if it doesnt drop calls again.

The PBX systems I found were:

*   [FreePBX](http://www.freepbx.org/)
*   [Elastix](http://www.elastix.org/index.php/en/)
*   [PBX In A Flash](http://pbxinaflash.com/community/home/)
*   [AsteriskNOW](http://www.asterisk.org/downloads/asterisknow)

### LIFX Light bulb

Got the [LIFX light bulb](http://au.lifx.co/) on my birthday! :smile:

It's funny that the first 'home appliance' I ever did a firmware upgrade to was the vacuum now its my light bulb that needs an upgrade.

The mobile application doesn't have all the features advertised yet but still does a good job of changing colours and performing effects.

### Apt-Cacher

I set up an Apt-Cache server using a [tutorial from Tecmint](http://www.tecmint.com/apt-cache-server-in-ubuntu/). Apt-Cacher NG is a repository similar to Windows Server Update Services where all 'apt-get install' files are saved for future downloads.

### Syntax Highlighting in Word

I spent half of November studying and doing exams. One subject has a purely programming subject and including code into Microsoft Word always had to be screenshots. In comes planetB's copy and paste [Syntax Highlighter](http://www.planetb.ca/syntax-highlight-word). Works in Chrome and IE but apparently has issues in Firefox.

[![Syntax Highlighting Word](capture5.png)](capture5.png)

### PotPlayer Video Quality

A lot of people like VLC. I think it's complete crap. PotPlayer (previously known as KMPlayer) is the king of video players.

I aimed to get even higher quality form my PotPlayer and luckily other people had the same intentions. [Ranpha has written a guide](https://imouto.my/configuring-potplayer-for-gpu-accelerated-video-playback-with-dxva-or-cuda-and-also-high-performance-software-decoding/) on configuring PotPlayer for high quality GPU accelerated playback with DXVA, CUDA or high-performance software decoding.

It has a lot of things I didn't think I needed like LAV Filters and madVR (for Madshi).

### GPU Overclocking

My 2 year old GTX 680 isn't handling games at max settings very well anymore. I had to overclock it to play Far Cry 4. An easy task for any novice really, but it shows that it's possible to keep old stuff running but dumping more voltage into them.

[![gtx 680 overclock](capture6.png)](capture6.png)

## Currently Interested In

*   Now exams are over I can focus a lot more on computers!
*   pfSense CARP failover
*   There are a bunch of things I've read that people have so I want to try them all out:
    *   Firefly (Firewall)
    *   Fog Server (PXE)
    *   Salt (system monitoring)
    *   OwnCloud (private cloud)
    *   Suricata (IDS/IPS)
    *   Syncthing (private cloud)
    *   Rdiff-backup (backup)
    *   Ansible (automation)
    *   Meshnet/hyperboria (router)
    *   Freenet / i2p / tor
    *   Tahoe-LAFS (file system)
    *   Puppet (automation)
    *   Bacula (backup)
    *   Madsonic (media streamer)
    *   [Caketop Theater](https://github.com/XanderStrike/caketop-theater) (media streamer)
    *   MythTV (DVR)
    *   [Zoneminder](http://www.zoneminder.com/) (surveillance)
    *   Zimbra (email)
    *   zPanel (web panel)
    *   Sophos UTM (firewall)
    *   Webmin (web panel)
    *   Seafile (private cloud)
    *   Torrelay
    *   Music Player Daemon (media streaming)
    *   OpenHAB (automation for home)
    *   Observium (network monitoring)
    *   Nexpose (IDS/IPS)
    *   Subsonic (media streamer)
