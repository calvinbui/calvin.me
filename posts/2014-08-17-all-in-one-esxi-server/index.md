---
title: My All In One ESXi Server
categories:
- Server
tags:
- esxi
- server
- zfs
tags:
- 
thumbnail: thumbnail.png
---

Since the start of the year I've been working as a Technical Consultant at IBM. It's been a great experience, putting a lot of knowledge into practice with enterprise-grade hardware and software. The infrastructure at work is as you would expect with a lot of services and applications that are well thought out and easily to use. I wanted to learn a lot more about all the stuff at work so I came up with the idea to build my own ESXi whitebox at home (we use [VMware ](http://www.vmware.com)at work) to do some self-learning and have fun while doing it. Having a 'homelab' would give me the opportunity to learn a lot more about the stuff I love. This is the build.

<!-- more -->

Thus began the long research into what I needed. Building your own server vs. buying a pre-built rack unit by IBM, Dell or HP really implores you to make sure every part you pick is thought out and compatible. [VMware's compatibility guide](http://www.vmware.com/resources/compatibility/search.php) can provide a starting point but can be outdated. Searching through Reddit's [HomeLabs](http://www.reddit.com/r/homelab/) subreddit is also a good place to start with many people building their own white boxes instead of buying a pre-built unit.

## All In One

I knew I wanted an all in one ESXi server that could both provide storage and computing for itself - that was a good place to start. Generally you would run a server and storage in separate machines so that you could erase the machine without worrying what would happen to your storage. With an all in one however the machine becomes married to the storage so if anything happens to either, I'm left with nothing. While this can be bad, it does save having to building another machine to just provide storage - reducing power bills, room real estate and extra maintenance.

This was my first real server so it was a good starting point, perhaps in the future I could really ramp it up. But living by myself, having all these features and no users really doesn't affect anyone but myself during downtimes. Perhaps in the future when I'm living with roomies or get really serious with it I would definitely expand and mimic a enterprise as much as possible - and this means separated storage. Maybe when 10Gbps and Fibre Channel get cheaper?

## Server Goals and Aspirations

### ZFS

For an all in one solution (AIO) I looked at [napp-it](http://www.napp-it.org/), a web-based ZFS NAS/SAN solution. I had heard of ZFS when working with storage in my previous home server but now this gave me a chance to try it out - and why wouldn't I? Napp-it would essentially be running on the server providing software RAID to the ESXi host. Alternatives include [Nexenta ](http://www.nexenta.com)(free up to 18TB) and [FreeNAS](http://www.freenas.org) (not recommended to be virtualised).

But to even run napp-it, I first had to install it somewhere on the host so this is why I bought a cheap pair of Intel SSDs (shown below) and used napp-it's built in feature to mirror itself onto both drives - since if napp-it dies, none of the drives are going to be usable.

The main reasons for using ZFS (if you can't find it online) to me were:

* software RAID
* detects silent corruption
* end to end check-sums tests
* snapshots
* compression

### Single Points of Failure

From the point above, reducing single points of failures (SPOF) was also a goal. Basically a SPOF is the idea that if one specific part dies, it's gonna stop the entire system from working. Examples include having one power supply or one RAID card (so all your data gets lost). To best prevent this:

* RAID where possible
* Buy popular parts in case I need a 2nd hand part after failure
* Long warranties products (5 years and up)
* Buy from reputable stores

## Infrastructure

I've learnt a lot of things at work (as I've said about) and there are a lot of things I'd like to implement into my own infrastructure. A lot of neat things have stood out to me:

* [pfSense](https://www.pfsense.org/) - an open-source firewall, router, UTM and DNS. A great way to get enterprise-level networking without having to buy it. A great place to start setting up VLANs.
* [Bitnami](https://bitnami.com) -  several easy and intuitive applications (as virtual appliances) that would be great for an advanced user such as git repositories, stacks and other server software.
* Windows Services - as part of their server OS, Microsoft have PXE servers, LDAP servers, Active Directory and Windows Update servers.

## The Parts

### CPU - [Intel Xeon E3-1230 V3](http://ark.intel.com/products/75054/Intel-Xeon-Processor-E3-1230-v3-8M-Cache-3_30-GHz)

Xeon are meant for servers/workstations. They don't have integrated graphics (well some of them do, but 90% don't). The E3-1230 is more or less a i7 4770 but 100MHz less. It uses the 1150 socket, supports VT-d (for VMware passthrough) and also supports ECC RAM (a must for ZFS) . It's probably the best priced Xeon for private/home usage. If you want to go with an E5 or E7, they may have unique motherboards that only fit in special cases.

_Alternative: E3-1220 for a little slower clock speed but lower price._

### CPU Cooler - [Noctua NH-L12](http://www.noctua.at/main.php?show=productview&products_id=46&lng=en)

I. Love. Noctua.

The NH-L12 has a very unique top-down design, providing additional cooling for VRMs and the motherboard. This was the selling-point as the LSI RAID controller on the Supermicro motherboard was known to run hot. The cooler is also small enough to fit in the unconventional area Supermicro placed the CPU socket. It uses two fans and low profile.

_Alternatives: Noctua NH-L9i for even smaller or NH-U12S for taller._

### Motherboard - [Supermicro X10SL7-F-O](http://www.supermicro.com/products/motherboard/Xeon/C220/X10SL7-F.cfm)

The main selling point of this motherboard is the built-in LSI controller and 8x SAS ports - perfect for a ZFS build. It takes away the need to purchase an additional RAID card which only adds another SPOF. Otherwise this motherboard also has a nifty IPMI port (similar to an IMM port) for server management. The only thing I don't like about it is that its a micro-ATX board instead of a mini-ITX, though I doubt a mITX version could fit 8 SAS ports.

_Alternatives: Any board that supports ECC, server management features and everything you think you'll need over the next few years._

### Memory - [Samsung ECC DDR3-1600 8GB](http://www.amazon.com/Samsung-M391B1G73QH0-YK0-DDR3-1600-Un-Buffer-PB-Free/dp/B00I30SLJQ) x 4 (32GB)

This RAM was listed as compatible by Supermicro for the X10SL7. Samsung guarantee lifetime warranty on each module and the Supermicro supports 32GB maximum. As everyone should know, you should get as much RAM as possible for a virtualised environment. ZFS should eat up almost half my RAM so having as much as possible becomes really important for the other VMs.

_Alternatives: Any ECC RAM supported by your motherboard manufacturer and as much as possible._

### Storage - [Intel 520 120GB](http://ark.intel.com/products/66248/Intel-SSD-520-Series-120GB-2_5in-SATA-6Gbs-25nm-MLC) x 2

Two drives I got on sale to run napp-it. Basically these two drives run napp-it and nothing else, reducing their chance of failure. Napp-it has to run somewhere to be able to provide ZFS and two Intel SSDs couldn't be a better choice.

_Alternatives: Any recommended SSD for the lowest price._

### Storage - [Samsung 840 Pro 512GB](http://www.samsung.com/au/consumer/pc-peripherals/solid-state-drive/ssd-840-pro/MZ-7PD512BW) x 2

The 840 Pro was regarded at the time as the best and fastest SSD money could buy (before it will be beaten by the 850 Pro next month). Virtual Machines love fast IOPS and therefore I chose the Samsung 840s. They will be running my VMs exclusively. The great thing is they also have a 5 year warranty.

_Alternatives: Any two fast SSDs_

### Storage - [Western Digital Se 4TB](http://www.wdc.com/en/products/products.aspx?id=1050) x 6

Six 4TB drives for a total of 24TB (21.8T after calculations) raw space. The 'Se' drives are optimal for NAS and 24x7 reliability e.g. Datacenters. These drives will be exclusively used for personal storage like pictures, videos and documents. Data integrity and redundancy is integral so I run them in RAID 6 (or RAIDZ-2) for a usable 14.3TB.

_Alternatives: WD Red, Seagate NAS or enterprise drives. As much as you think you'll need (you can always expand in ZFS)_

### Storage - [SanDisk 16GB Cruzer Blade](http://www.sandisk.com.au/products/usb/drives/cruzer-blade/)

This USB's job? To run ESXi. Why waste a HDD or SSD for ESXi when a simple USB can do the job. ESXi runs in the memory after boot so the USB gets little wear and tear on it. While it is a SPOF, it is not a big concern to me as of yet.

_Alternatives: Any USB drive that doesn't suck._

### Case - [Fractal Design Define Mini](http://www.fractal-design.com/home/product/cases/define-series/define-mini)

This was the smallest mATX case that supported the most drives (I would've went with the Silverstone DS380 but it's mITX). It is the same case as the ARC Mini R2 but with noise-dampening material. To support more drives (because I had 10 drives altogether) I used two [Icydock MB343SP](http://www.icydock.com/goods.php?id=167) with [Molex-M to 2 SATA ](http://www.arc.com.au/image.php?8106)cables. The Icydock allows for two more 2.5" and one 3.5" drive to live in a 5.25" slot.

_Alternatives: ARC Mini R2, Node 804, maybe even a rackmount_

### Power Supply - [Corsair AX760](http://www.corsair.com/en/ax760-atx-power-supply-760-watt-80-plus-platinum-certified-fully-modular-psu)

Any respectable power supply really does the job well. The benefit of the AX760 is the hybrid fan which only spins when the system is under a heavy load. Originally I was going to go with a fanless PSU but they were all out of stock. Corsair also holds a 7 year warranty.

_Alternatives: Fanless PSU for low noise or any with a good warranty_

### UPS - [CyberPower PFC Sinewave 1300Va](http://www.cpsww.com.au/Product/Product/GetProduct?id=10&mid=32#.U_CDyfmPHuQ)

A UPS is essential for not losing/risking data. This server is gonna be a lot of hard work, sweat and tears so having all gone after a blackout will be dreadful. This UPS has its own virtual appliance which can connect to ESXi and order it to shutdown when the power goes out. It can also email me to notify if this has happened so I can rush home. Would provide 10 minutes of power I reckon.

_Alternatives: There is 1500Va model that would give a few more minutes I assume._

### Fans - [Noctua Fans](http://www.noctua.at/main.php?show=produkte&lng=en)

The Fractal Design Define Mini has 6 fan slots but I made a few for myself (attached two to the hard drive cage for more cooling). Noctua fans are the best in my opinion for low-noise and performance, others may argue Gentle Typhoons or Noiseblockers. I had a few Noctuas lying around for the build but also bought a few extra:

* Two NF-S12B fans in the front (should have been more pressuried fan given the tight space but oh well)
* Two NF-S12B fans attached to the HDD cage (they just slide into space, they don't even need cable ties)
* One NF-S12B intake on the bottom
* One NF-S12B exhaust on the rear
* One NF-P14S exhaust on the top

Make sure you have enough cables to power the fans!

## Rack - [Ikea Mulig Shelf](http://www.ikea.com/au/en/catalog/products/60247904/#/60253103)

It's gotta go somewhere right?

But if you really want a rack (but don't have the money to get one because you spent it all on the server), you can [hack an IKEA coffee table into your own rack](https://wiki.eth0.nl/index.php/LackRack).

## Conclusion

All up the server costs around $4500, a lot of money. I could justify this but many others could not. If you're on the fence about think about why you need one in the first place. For me I wanted to be able to have an environment where I was able to learn and gain valuable skills (I'm not that great at networking but I'm starting to get a good grip on it now) for the future.

I don't think you can go wrong with whatever parts you pick if you think them out long and hard. Post your build over at some forum or /r/HomeLabs (linked above) to get some opinions from others. Every build is a little unique and personalised but I found a lot of people have gone the same route I have especially with the motherboard selection.

Just have fun with whatever you do and don't stress if it doesn't work at first - that's when you really learn.
