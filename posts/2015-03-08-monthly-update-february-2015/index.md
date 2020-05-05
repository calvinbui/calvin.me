---
author: Calvin Bui
comments: true
date: 2015-03-08 07:37:41+00:00
layout: post
slug: monthly-update-february-2015
title: Monthly Update (February 2015)
categories:
- Monthly Update
tags:
- monthly update
image: /assets/images/2015-03-08-monthly-update-february-2015/featured-image.jpg
images: /assets/images/2015-03-08-monthly-update-february-2015/
---

In the monthly update, I like to cover what I've been doing throughout the past month in regards to technology, computers and more.

You will also find what I'm currently interested in for the following weeks. If something doesn’t have a link, I may cover it myself in the future because I couldn't find much about it online.

<!-- more -->

## LIFX 2.0

The upgrade to my lightbulb brings IFTTT (If this than that) integration. I previously used IFTTT to notify me when registration pages opened on private sites and it worked reasonably well.

Some recipes I would recommend:

* [Flash when I received a SMS](https://ifttt.com/recipes/251774-flash-green-when-i-receive-an-sms-on-my-android)
* [Turn lights on/off as I approach/leave home](https://ifttt.com/recipes/251782-fade-my-lifx-lights-on-as-i-approach-my-home)
* [Fade lights on every workday](https://ifttt.com/recipes/251777-fade-my-lights-on-every-workday)
* [Turn on lights by sending an email](https://ifttt.com/recipes/253479-turn-all-lights-on-by-sending-an-email)

## CloudFlare Dynamic DNS

I was previously using the [HTTP API](https://www.cloudflare.com/api.html) but now CloudFlare has deprecated it in favour of their [JSON API](https://www.cloudflare.com/api_json.html). There was one big change which required obtaining the domain's record ID instead of just listing its name and which type to change.

```
https://www.cloudflare.com/api_json.html?
a=rec_edit
&
tkn=aaaabbbbccc
&
id=123123123
&
email=email@gmail.com
&
z=calvin.me
&
type=A
&
ttl=1
&
name=calvin.me
&
content=%IP%
```

A few helpful sites

* [https://techjourney.net/update-cloudflare-as-dynamic-dns-ddns/](https://techjourney.net/update-cloudflare-as-dynamic-dns-ddns/)
* [https://www.cloudflare.com/docs/client-api.html](https://www.cloudflare.com/docs/client-api.html)
* [http://kevo.io/code/2012/11/07/cloudflare-dynamic-dns/](http://kevo.io/code/2012/11/07/cloudflare-dynamic-dns/)
* [https://www.ignas.net/guides/guide-2013-10-29-managing-your-domain-with-cloudflare.html](https://www.ignas.net/guides/guide-2013-10-29-managing-your-domain-with-cloudflare.html)

## Link Aggregation

Putting that I350-T4 too good use!

First I added 3 physical adapters to the vSwitch on ESXi following their [official video](https://www.youtube.com/watch?v=Hx9FAo7_H2k). Everything went well so I enabled Port Trunking (EtherChannel  if you use Cisco terminology) on my D-Link switch but then it completely stopped working :disappointed: After a short read, I found this [question on serverfault](http://serverfault.com/questions/618217/link-aggregation-in-esxi-5-5) which led to believe that ESXi only Load Balances but default and doesn't do any LACP.

Enabling Load Balancing on ESXi by default only acts as a failover using the **Route Based on Originating Port ID** option. Changing it to **Route Based on IP Hash** balances load across all of the network adapters in the team and make use of every single adapter in the process! This [VMware KB](http://kb.vmware.com/selfservice/microsites/search.do?language=en_US&cmd=displayKC&externalId=2006129) really helped explaining that and also this page from [Pearson Certification](http://www.pearsonitcertification.com/articles/article.aspx?p=2190191&seqNum=8) (but don't even recommend it...).

[![Capture]({{page.images}}capture.png)]({{page.images}}capture.png)

Finally I left the final port into my WAN connection in case anything ever goes wrong with that and because Port Trunking only does a maximum of 4 ports anyway :P

For whatever reason, no one recommends this wherever I search with the main reason being '_it's too complicated_' or '_it adds an extra layer of complexity_'. It's not that complicated firstly and if it does work then there shouldn't be anything wrong with it afterwards unless you mess with it?

## BitLocker Encryption

I thought it would be time I started encrypting my workstations (Desktop and Laptop). Based on [LifeHacker's article](http://lifehacker.com/five-best-file-encryption-tools-5677725) many commenters were wary of what NSA backdoors there were to BitLocker and chose VeraCrypt as the number one choice. For my own purposes I wanted simple and easy and opted for BitLocker instead. It was fast and now totally transparent within Windows. The only time I notice it is when I see my C drive has a padlock over it.

[![Capture]({{page.images}}capture.png)]({{page.images}}capture.png)

## Server Rebuild

I'm starting to rebuild a lot of my VM's to make sure they're all as optimised as possible. At the same time I'm hoping to write into my wiki and document everything about them.

These are some changes I've made to my typical install:

* Paravirtual SCSI - definitely some disadavantages but paravirtual means it is isnt a virtual device like an E1000
* Video card specification also lowest as possible.
* Taking away the CD/DVD drive saves about 10MB of RAM
* Using Open-VM-Tools instead of the official VMware Tools
* Disabling LVM
* Disabling automatic security updates

## MediaWiki Infobox

I've taken some time to write document my hosts in MediaWiki. What you start off with in terms of templates is pretty much nothing. I took some time to export some Wikipedia templates into my own and customise the infoboxes to meet my needs. Here's one I'm using a lot to quickly display host information:

[![Capture]({{page.images}}capture1.png)]({{page.images}}capture1.png)

```text
{% raw %}{{Infobox
| bodyclass   = vevent
| bodystyle   = {{{bodystyle|}}}
| title       = {{#if:{{{title|{{{name|}}}}}}|{{{title|{{{name|}}}}}}|<includeonly>{{PAGENAME}}</includeonly>}}
| titleclass  = summary
| labelstyle  = white-space: nowrap;
| image       = {{#invoke:InfoboxImage|InfoboxImage|image={{{logo|}}}|size={{{logo size|{{{logo_size|}}}}}}|sizedefault=64px|alt={{{logo alt|{{{logo_alt|}}}}}}}}
| caption     = {{{logo caption|}}}
| image2      = {{#if:{{{collapsible|}}}|{{hidden begin|title=Screenshot|titlestyle=text-align:center}}}}{{#invoke:InfoboxImage|InfoboxImage|image={{{screenshot|}}}|size={{{screenshot size|{{{screenshot_size|}}}}}}|sizedefault=300px|alt={{{screenshot alt|{{{screenshot_alt|}}}}}}}}
| caption2    = {{{caption|}}}{{#if:{{{collapsible|}}}|{{hidden end}}}}
| header1     = Information
| label3      = Hostname
| data3       = {{{hostname|}}}
| label5      = IP
| data5       = {{{ip|}}}
| label7      = Website
| data7       = {{{website|}}}
| label9      = Working Directory
| data9       = {{{directory|}}}
| header11    = Software
| label13     = Version
| data13      = {{{version|}}}
| label15     = Last Updated
| data15      = {{{dateupdated|}}}
| label17      = OS
| data17       = {{{os|}}}
| label19      = Middleware
| data19       = {{{middleware|}}}
| header21     = Hardware
| label23      = CPU
| data23       = {{{cpu|}}}
| label25      = Memory
| data25       = {{{memory|}}}
| label27      = Network
| data27       = {{{network|}}}
| label29     = Hard drive
| data29      = {{{hdd1|}}}
| label31     = Hard drive2
| data31      = {{{hdd2|}}}
}}{% endraw %}
```

## Fix JetPack Related Posts Issues

WordPress' Photon (CDN) runs into issues whenever it access my site. I narrowed the problem down to NGINX redirecting HTTP to HTTPS which causes Photon to not find content for whatever reason. Adding this location block into the HTTP (Listen 80) block allows HTTP connections to be made to images.

```nginx
location ~ ^/wp-content/(.*).(svg|svgs|jpg|jpeg|gif|png|bmp)$ {
   access_log off;
   log_not_found off;
   expires max;
}
```

## Interested In

* Really want the VMware and Microsoft certifications but $800 + vSphere 6 and Windows 10 coming out soon I think I'll wait.
* Switch to DNS Resolver in pfSense from DNS Forwarder
* Mounting shares on a as-needed basis using Autofs
