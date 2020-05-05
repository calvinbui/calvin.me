---
author: Calvin Bui
comments: true
date: 2014-11-02 04:44:49+00:00
layout: post
slug: fortnightly-update-22112014
title: Fortnightly Update (2/11/2014)
categories:
- Monthly Update
tags:
- fornightly update
image: /assets/images/2014-11-02-fortnightly-update-22112014/featured-image.jpg
images: /assets/images/2014-11-02-fortnightly-update-22112014/
---

In the fortnightly update, I bring you what I've been doing throughout the past two weeks in regards to technology, computers and more with links to tutorials and guides.

You will also find what I'm currently interested in for the following weeks. If something doesn’t have a link, I may cover it myself in the future because I couldn't find much about it online.

<!-- more -->

## Fortnightly Update 22/11/2014

Now it's fortnightly instead of weekly. Funny ha.

### CloudFlare DNS Update Script for pfSense

Having moved over to CloudFlare, I had to move to switch my DNS servers over to them. Previously they were using Namecheap's free dynamic DNS which was a built-in provider in pfSense, allowing me to automatically update my DNS records to my home server. CloudFlare does not have a Dynamic DNS app, but it sucks really. Luckily they also have an API which I can use within pfSense.

Looking at [Larry Bolt's gist ](https://gist.github.com/larrybolt/6295160)which calls this API, I simply replaced the variables with my own and was able to make the following URL to put into pfSense:

```config
https://www.cloudflare.com/api.html?a=DIUP&hosts=example.com&u=username@email.com&tkn=abc123abc&ip=%IP%
```

Replace the following with your own:

* example.com with your domain
* username@email with your CloudFlare login
* abc123abc with your CloudFlare API key
* %IP% with the IP to set it to. pfSense automatically replaces %IP% with your WAN IP address.

### VisualEditor in MediaWiki

This was a pain to setup, I'm happy they're bringing it in as default in later version of MediaWiki. I haven't written anytime in mine yet because I had to learn how to write in Wiki markdown but this is a step in right direction to get more individuals writing on Wikipedia. I had help on this [here ](http://www.mediawiki.org/wiki/Extension:VisualEditor)and [here](http://edutechwiki.unige.ch/en/VisualEditor). The editor itself is still considered beta as there are still a lot of things it cannot do like tables. You can see the full [roadmap to completion on the MediaWiki site](http://www.mediawiki.org/wiki/VisualEditor/Roadmap).

[![mediawiki visual editor]({{page.images}}capture7.png)]({{page.images}}capture7.png)

### LDAPS (LDAP over SSL)

This was very easy to do for my Active Directory/Domain Controller.  Non-SSL still works too. All you have to do is install Active Directory Certificate Services and off you go! Greg Peason provides a Server 2012 (applies to R2 as well) guide [here](http://gregtechnobabble.blogspot.com.au/2012/11/enabling-ldap-ssl-in-windows-2012-part-1.html). It is very easy and then your usernames and password would be encrypted (I hope!).

For outputting certificates and converting them I had some help [here](https://confluence.atlassian.com/display/DOC/Configuring+an+SSL+Connection+to+Active+Directory).

Time to begin updating all my LDAP connections to use SSL instead of plain text.

### Currently Interested In

* Still interested in a Gist for myself. So far I've found [pastgit](https://github.com/mmikulicic/pastgit), [gitpaste](https://github.com/justinvh/gitpaste), [Gistie ](https://github.com/gmarik/Gistie)and [phorkie](https://github.com/cweiske/phorkie). I'll give them a whirl soon.
* LDAP authentication for NGINX. Hopefully soon.
* System monitoring and logging. As my infrastructure gets bigger and bigger I've got to start taking care of it. This would be good experience in the future as well :smile: Some I've looked at are Nagios, Zabbix and the popular ELK stack.
* Put my old HP N40L server to good use. It still has some hard drives in it and about 8GB of RAM for a simple ESXi host.
