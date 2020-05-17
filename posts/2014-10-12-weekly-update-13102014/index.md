---
title: The Weekly Update (13/10/2014)
categories:
-   Misc
tags:
-   weekly update
thumbnail: thumbnail.png
---

In the weekly update, I bring you what I've been doing throughout Monday to Sunday in regards to technology, computers and more with links to tutorials and guides.

You will also find what I'm currently interested in for the following weeks. If something doesn’t have a link, I may cover it myself in the future because I couldn't find much about it online.

<!-- more -->

## Weekly Update 13/10/2014

We might as well turn this into the 'fortnightly update' at the rate it's going. But this is a busy period nearing the end of the Uni semester so after exams I'll more regular.

### Separated Download Server

This is something I should've done from the start but better late than never. Before I used to have SABnzbd, NZBDrone and CouchPotato together on the same host but when something broke, I ended up breaking everything along with it hahaha. The downside of the separation is of course higher allocation of resources, as each requires its own Operating System and that alone can take quite a bit.

Luckily there's a solution! Well a work-around, but still better than nothing! When installing Ubuntu Server, you can press F4 to install a 'minimal virtual machine' meaning things like graphics and sound aren't install with the kernel, reducing memory by roughly half!!!! Sadly I didn't do this until I found out, but [Attila Györffy has a post on CoderWall](https://coderwall.com/p/a56j3w) where he shows how to achieve this by manually disabling those components.

[![UbuntuVM](ubuntuvm002.png)](ubuntuvm002.png)

### CloudFlare Free SSL

I [posted](/currently-moving-cloudflare/) about this [twice already](/update-transition-cloudflare/) but my site is now using CloudFlare as its CDN which means it loads faster plus protection from CloudFlare security. I could kiss you CloudFlare if you had a face. You can find more about CloudFlare's features [here](https://www.cloudflare.com/overview) and why you should take up their free SSL offer!

[![SSL Issued](capture1.png)](capture1.png)

### Changed duplicate passwords via LastPass

I use LastPass as my password manager. There are others out there like KeePass and 1Password. I thought after everything I've been hearing about security lately like Shellshock, iCloud and HeartBleed it was time to change that password I was using before I was generating passwords with LastPass. It took a while but eventually I was able to change them all.

A tip I received from Dennis from VMware is to not trust password managers, because once someone gets access to them they'll have access to everything. He however told me a little trick of adding a security word onto every password you generate so hackers would still need a little bit more to get access to your accounts.

### Usenet Providers

A year goes by very quickly and before you know it a million different renewals come up (e.g. car rego/insurance is always a bitch). I previously used Frugal (cheap but decent) and Tweaknews (slow and slower) but wanted a cheaper more reliable option. I found  [xsusenet](https://www.xsusenet.com/) which offered a FREE lifetime account. I knew it would be slow but nonetheless a good backup. Sadly it died after 500MB and never wanted to start every again. That just shows me that they would fail their paid users if they can't even handle the free ones.

Next I tried [Usenet Bucket](https://www.usenetbucket.com/en/) on their free trial period. The speeds were fast. I used to get 7MB/s from Tweak from this was getting me an average of 10-11/MB/s per download. The thing is though I don't need fast speeds, I just need a reliable provider with long retention because I'm usually going to be home until night to even watch or see what SABnzbd downloads.

I ended up going with Usenet Bucket after they gave me a 20% discount after the trial. I thought to myself they were one of the many providers that werent with Highwind (the company that's buying every other provider out there to create a monopoly or something), the speeds were good and I liked their overall website, design and emails that they've put effort into.

### Currently Interested In

*   [StatusPage.io](https://statuspage.io) is the provider of the server status page I've seen so often on sites like [Bitbucket](http://status.bitbucket.org/). As my infrastructure grows and grows eventually I will need a way to monitor everything. For example this site crashed one day and luckily [New Relic](http://newrelic.com/) notified me, even though it was meant to measure performance. StatusPage isn't free however, but free if I never activate the page meaning I can still use it if I login hehehe. Alternatively I can just design my own using PHP like I've done before:

[![PHP Services](capture2.png)](capture2.png)

*   Gist. Specifically my own Gist. Having a Git server is nice and all but sometimes saving just a single file is all I want. My pastebin does this but it doesn't support reverting or updating which is what I'm really looking for.
