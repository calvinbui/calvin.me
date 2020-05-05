---
title: The Weekly Update (7/9/2014)
categories:
-   Misc
tags:
- weekly update
thumbnail: thumbnail.png
---

In the weekly update, I bring you what I’ve been doing throughout Monday to Sunday in regards to technology, computers and more with links to tutorials and guides.

You will also find what I’m currently interested in for the following weeks. If something doesn’t have a link, I may cover it myself in the future because I couldn’t find much about it online.

<!-- more -->

## Weekly Update 31/8/2014

### Front-end for download server

Having the complete Usenet package (CP, sab, drone, sb etc.) is nice but accessing it can be a little painful. That's why a front end is needed to painfully show the status of each and what they're up to. I had a look at three:

*   [Maraschino](http://www.maraschinoproject.com/): No NZBDrone support and the fork that has it works half the time. Does not require XMBC server even thought it was built for it. Not mobile-friendly so automatically out.
*   [HTPC Manager](http://htpc.io/): Same Maraschino with no NZBDrone support yet. The interface is quite dull as well, plain old bootstrap. Hopefully that means I can theme it if I wanted.
*   [Network Status Page](https://github.com/d4rk22/Network-Status-Page): Relies on Plex media player as far as I can see. Would need to edit the code to get it to be just a plain status page. No NZBDrone support once again...

I think in the end I would just go with making my own or using d4rk's Network Status Page and configuring it to my liking. HTPC Manager could be the way to go in the future as soon as it supports NZBDrone. Need to keep tabs on this.

## NZBDrone with SSL

Took a little bit of fussing around but NZBDrone finally took the certificate I made for it. Just follow this guide from the [NZBDrone GitHub Wiki](https://github.com/NzbDrone/NzbDrone/wiki/SSL). I find the SSL version takes a little longer to load than the plain HTTP one.

## Configuring with ZFS File Shares

I'm going to make a post on this in the future because it was a pain in the butt. Basically made my ZFS File system available to myself as read write and to everyone as read. I found doing it through ACLs was confusing and just annoying since adding new users to the ACL really threw everything off. So instead CIFS shares are now password protected and are the only way to r+w. Guests can only have FTP and HTTP access for read only. I think that's good enough.
