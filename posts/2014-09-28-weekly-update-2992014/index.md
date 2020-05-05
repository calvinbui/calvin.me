---
title: The Weekly Update (29/9/2014)
categories:
- Monthly Update
tags:
- weekly update
tags:
- 
thumbnail: thumbnail.png
---

In the weekly update, I bring you what I’ve been doing throughout Monday to Sunday in regards to technology, computers and more with links to tutorials and guides.

You will also find what I’m currently interested in for the following weeks. If something doesn’t have a link, I may cover it myself in the future because I couldn’t find much about it online.

<!-- more -->

## Weekly Update 29/9/2014

### Active Directory Domain Services

I finally did something I said I would do in my [previous weekly update](/weekly-update-2292014/)! At first I ran into some issues because I chose not to use MS DNS and thought pfSense's DNS could handle it all. Bad idea, Active DIrectory worked but joining the domain never did. On the retry, I chose to install the DNS Server and it automatically started using my pfSense DNS as a forwarder. I believe this was because it previously had a static IP and grabbed it from there. I've connected my main computer to it as well as napp-it.

I thought having a domain controller was going to be stupid for a home network but it really is quite nice. So far I can't think of a reason not to join my computers to the domain.

### Restored /var/ folder permissions

Over the weekend I had some issues with this site's permissions so I decided to do a _chown_ on the folder. Stupid me I did a _chown_ on the ENTIRE /var folder which has things like MySQL running from its own account. Lots of issues came up so I had to find a way to fix it without starting again.

I ended up following [this guide from ilijamt](http://blog.matoski.com/articles/debian-restore-var-ownership-permissions/). The guide has quite a few spelling mistakes (e.g. get_selections instead of get-selections) and assumes you are a good Linux user to begin with.

### Took a DB2 class

My department held a IBM DB2 class for University students. I attended it over 3 days to receive a certification :smile: My first but I hope to get a few over the next few years. Microsoft are apparently [revamping their exams](http://windowsitpro.com/cloud/microsoft-expands-its-outsourced-certifications-contract-pearson-online-exams) to reflect more real world situations.

### Bought a new domain

I bought a new domain (which I wish to keep secret) to host my download server on. I got it from the guys over at [iwantmyname](https://iwantmyname.com/), a very nice and neat looking website. They put a lot of work into it to make it easy to use, buy a domain and funny as well (just look at any of the domain descriptions).

The problem with their dynamic DNS implementation is that it is script based and uses email addresses as 'usernames' which do not work well in pfSense. After a little searching I found that Namecheap offer their [DNS service for free](https://www.namecheap.com/domains/freedns.aspx) and changed it straight over. Namecheap didn't support my domain extension or otherwise I would've bought it from them to begin with.  Now pfSense has two sites it is providing my IP address towards.

### Currently Interested In

* Connecting everything to my new shiny active directory. Single sign on everywhere :') Some things won't be supported like most of the things people want to use on my network (NZBDrone, CouchPotato etc.). There should be a HTTP authentication method through NGINX which connects to Active Directory.
* Once I get the Active Directory working properly the next step will be a RADIUS server. If it is what I think it is then I should be able to login to my WiFi using AD credentials...right?
* I got a IBM ServeRAID M5016 card from work. Right now I have absolutely no use for it but it would be good for future projects (like a proper storage host instead of an AIO).
