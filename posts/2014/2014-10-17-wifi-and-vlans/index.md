---
title: WiFi and VLANs
categories:
- Networking
tags:
- vlan
- wifi
# https://www.iconfinder.com/icons/3259413/media_social_wifi_icon
thumbnail: thumbnail.svg
---

WiFi is so important in the household with the emergence of portable devices. Pretty much everyone that comes over my place, young or old, will want to connect to it for some YouTube (young) and Viber (old). Because my network is segregated into various VLANs, they must be directed and placed correctly into the right network. This is how I made my network work with WiFi and VLANs.

<!-- more -->

## The Problem with WiFi and VLANs

This is where the initial problem starts. I needed both WiFi and VLAN support but also the ability to have multiple SSIDs, one for each VLAN. After a long Google search and personal thinking I had two options:

1. One AP for **each** VLAN by configuring the switch ports individually.
2. One AP for **all** VLANs by configuring the switch port into a trunk/tagged port

Option 1 while easier, does require multiple power bricks and wireless routers so immediately I knew the only option to go with was Option 2.

## The Solution to the Problem

The solution was to find an AP that supported VLANs and multiple SSIDs. Easy right? These units were hard to find and expensive but after more Google searches I prevailed. I was left with a few options.

1. [Ubiquity Unifi AP](http://www.ubnt.com/unifi/unifi-ap/) (any home/office model): This was the best option. Unifi documented how it was possible to [assign VLANs and SSIDs to particular VLANs](http://wiki.ubnt.com/UniFi_and_switch_VLAN_configuration)  plus their products weren't ugly looking either. They packed a lot of features together and are constantly updating their software/firmware as well. The only downside that the price is a little too steep (roughly $400).

2. [Buffalo WAPS-APG600H](http://www.buffalotech.com/products/wireless/business-class-access-points/airstation-pro-80211n-gigabit-concurrent-dual-band-poe-wireless-access-point): Apparently this had all the features I needed but I couldn't find any documentation on it so in the end couldn't trust its implementation.

3. Some routers with [DD-WRT](http://www.dd-wrt.com/wiki/index.php/Multiple_WLANs)/OpenWrt:  This was too 'hacky' for my tastes. Usually I'm into this, and would love to give it a shot to get it working but I know all too well the feeling of failure after failure as things don't work for whatever reason. DD-WRT and other custom firmware are available for many inexpensive routers (under $100) to turn them into $300 routers.

## The Decision - Unifi AP-AC

![uap-ac-small](uap-ac-small.png)

So in the end I picked up two (yes two!) Unifi AP-AC models because it offered:

* Wireless AC compared to Wireless N
* 5Ghz at 1300Mbps compared to 450Mbps
* 2Ghz at 450Mbps compared to 300Mbps
* It was their latest model :P

By having two units, I could move between the two of them and connect to the one that is closer in range. This is known as a 'handoff' which is managed by the units themselves. At the time of writing this, the AP-AC mode [does not support 'zero-handoff'](https://community.ubnt.com/t5/UniFi-Feature-Requests/Zero-Handoff-on-UAP-AC/idi-p/641543) meaning you may be dropped off in specific cases such as VOIP calls. But this wasn't too big an issue for me as my VOIP calls connect to a different access point altogether.

## Setup

Once I got both units in the mail, I first had to find a place for them, connect them, figure out an IP address for them. Simple tasks that are better explained elsewhere than here. The real trouble is configuring VLAN access via tagged (trunk) and untagged (access) ports on my switch.

I had 4 main VLANs:

* Admin (10)
* User (20)
* Guest (30)
* Local (40)

This part is important: for the access points to have an IP address of their own, they need to be untagged on the VLAN you want them in. If I make them tagged ports instead, they would still work but would not have an IP address of their own and therefore unmanageable via the Unifi application. This is important to remember when setting up their Wireless networks.

So taking the above into account, I made them untagged on 10 and tagged on 20, 30 and 40. By tagging them, it means every packet sent and retrieve will have an associated VLAN attached onto it.

![switch vlan](capture3.png)

Next I setup the four networks within the UniFi web application which manages the access points.

![four networks](capture4.png)

NOTE! This is where you should remember what we did above. Because the access points are untagged on VLAN 10, they do not require a VLAN tag associated with the network as they are already on the VLAN. The others will however because they are untagged on that VLAN. Compare the the Admin VLAN and Guest VLAN below.

_The Admin VLAN is untagged, and therefore does not require a VLAN ID. The access points are already on the VLAN!_:

![admin settings](admin.png)

_The Guest Network VLAN ID is 30. It must be specified as the access points are trunk ports to this VLAN._:

![guest settings](guest.png)

After this I simply connected from my phone and they worked perfectly! Sure, you can go the full VLAN route but as I said you will not be able to manage the access points afterwards - therefore you won't be able to even add configure the networks to begin with. There's probably better methods out there (like maybe putting them all in a separate VLAN dedicated for WiFi) but it was a little bit too over the top for something like this. Feel free to try it though!

These settings were then automatically applied to both access points very easily. The UniFi software does not have to be running after this point unless you wish to log statistics. Networks, handoff and password are handled and saved by the access points.

## Ending Thoughts and Conclusion

If you have VLANs and needed wireless network access to all of them, I would say this is the best way to go about it instead of having a separate router for each VLAN.

The UniFi software is good, but not great. It is stable and everything works well for my needs however first time users will be confused at first as settings are all over the place - but it makes sense. Each access point has its own settings, each site has its own settings and therefore they are separated. The software also provides 'insights' into your users to see how much bandwidth each one is consuming. I was surprised to find my 3DS did 5GB over one night even though it wasn't particularly doing any downloads. Users can also be blocked if you feel they download too much. Apple devices show up with their real name while Android devices show their device hostname (accessible from Developer options).
