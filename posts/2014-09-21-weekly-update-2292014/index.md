---
title: The Weekly Update (22/9/2014)
categories:
-   Misc
tags:
-   weekly update
# thumbnail: thumbnail.png
---

In the weekly update, I bring you what I’ve been doing throughout Monday to Sunday in regards to technology, computers and more with links to tutorials and guides.

You will also find what I’m currently interested in for the following weeks. If something doesn’t have a link, I may cover it myself in the future because I couldn’t find much about it online.

<!-- more -->

## Weekly Update 22/9/2014

This is 1 week and 1 day late :disappointed: I've been busy with other stuff and haven't done much to be able to write anything decent but I'll give it a shot and keep at it!

### Git Repository

I use git regularly for any development projects I work on. My first experience was with SVN but Git has had less trouble so far. Bitnami provides a [GitLab virtual machine](https://bitnami.com/stack/gitlab) which is by far the easiest option to setup your own Git repository. GitLab has some very nice features like connecting to an Active Directory/LDAP which I did at work, bundled continuous integration and issue tracking. You will find most things similar to GitHub.

## Wiki

There are two popular Wiki software, [DokuWiki](https://www.dokuwiki.org/dokuwiki) and [MediaWiki](https://www.mediawiki.org/wiki/MediaWiki). I tried out both and they both had their strengths and weaknesses e.g. DokuWiki was better on mobile devices and MediaWiki has the visual editor. I chose to go with MediaWiki because it's what [Wikipedia](http://en.wikipedia.org/wiki/Main_Page) uses - what everyone else uses. Learning how to write articles in MediaWiki will definitely help whoever uses it in writing articles on Wikipedia as well.

## pfSense DMZ

My web servers sat on my management/control VLAN which had access to everything else on my network. This was bad bad bad because they were public Internet facing hosts. If anyone managed to break into them they would've had access to everything on my network. Creating a [DMZ on ESXi](https://doc.pfsense.org/index.php/PfSense_2_on_VMware_ESXi_5#Adding_a_DMZ) was also not that difficult. Placing hosts in a DMZ would allow any hacker access to the DMZ network and absolutely nothing else.

## Interested In

*   NZBGet: This has been picking up a lot lately as a replacement for SABnzbd. SAB is still the king but NZBGet is picking up a lot of traction from what I can see. It might be good to switch over eventually or at least give it a try.
*   Active Directory/Domain Controller: Adding another user to my network is a pain, having to create a user account literally everywhere. I'm opening up to have a LDAP/Active Directory now. My 2012 R2 server does nothing but WSUS anyway :P
