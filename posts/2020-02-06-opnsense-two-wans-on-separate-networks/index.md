---
title: "OPNsense: Two WANs on Separate Networks"
categories:
- networking
- how-to
tags:
- opnsense
---

How to use a different WAN interface on different internal networks within OPNsense.

<!-- more -->

# Background

At the back of my house, there's a granny flat with a family with two high schoolers. Recently, the NBN has come to my area and we now have to share the same Internet connection. I use [Mullvad as my VPN provider]({{ site.baseurl }}{% post_url 2019-04-20-choosing-a-vpn-service %}) and VPNs are easily blocked by a lot of video streaming services like Netflix, Amazon Prime Video and Optus Sports. The high schoolers use Netflix a lot and I wasn't going to sacrifice my VPN for them. Instead, I had to find a way to have a network that did not use VPN. A network that sends its traffic over WAN instead of VPN.

I've visualised the goal with this diagram:

[![]({{page.images}}diagram.png)]({{page.images}}diagram.png)

# Guide

In this guide I will have two networks:

- `Granny`: The Granny flat's network
- `My internal networks`: My networks.

## Firewall Rules

I have firewall rules for the that says for all traffic not using _Internal networks_, that they should be sent over the **WAN Gateway**.

[![]({{page.images}}granny-firewall-rules.png)]({{page.images}}granny-firewall-rules.png)

My networks have a similar rule but with using the **VPN Gateway**.

[![]({{page.images}}my-firewall-rules.png)]({{page.images}}my-firewall-rules.png)

## Outbound NAT

I have two separate NAT rules to dictate how network traffic should leave the router.

Any traffic from _Granny_ that isn't going to _Granny_ should go over the **WAN Gateway**.

[![]({{page.images}}outbound-nat.png)]({{page.images}}outbound-nat.png)

## Testing

I simple check is to go to [https://www.ipchicken.com/](https://www.ipchicken.com/) which gives me **WAN** IP address instead of the **VPN** IP address

[![]({{page.images}}ip-chicken.png)]({{page.images}}ip-chicken.png)