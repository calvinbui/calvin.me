---
title: "Testing NBN 1000 Ultrafast"
categories:
- Networking
- Review
- Web
tags:
- nbn
- gigabit
- internet
thumbnail: thumbnail.png
---

Testing the fastest residential NBN connection in Australia.

<!-- more -->

```toc
# This code block gets replaced with the TOC
```

I took up the [$30 off deal for NBN 1000/50 from Aussie Broadband](https://www.ozbargain.com.au/node/587348) during the Black Friday/Cyber Monday deals in Australia. It took three phone calls to support and hours of drop-outs during my first few days before it started working reliably.

## NBN 1000 / Home Ultrafast

NBN 1000, officially known as [Home Ultrafast](https://www.nbnco.com.au/learn/speed#home-ultrafast), is a speed tier provided to households with a [Hybrid Fibre Coaxial (HFC)](https://www.nbnco.com.au/learn/network-technology/hybrid-fibre-coaxial-explained-hfc-3) or [Fibre to the Premises (FTTP)](https://www.nbnco.com.au/learn/network-technology/fibre-to-the-premises-explained-fttp) connections. Note that only around 7% of HFC customers are eligible.

NBN 1000 / Home Ultrafast rated between **500 Mbps to 1000 Mbps (1 Gbps)** downloads and up to **50 Mbps** upload. Converting that from megabits to megabytes, it would be **62.5 MB/s to 125 MB/s** downloads and **6.25 MB/s** upload.

## Test methodology

All tests performed were late at night during off-peak/evening hours (~2 AM to ~8 AM) to get the most of the connection.

I ran the tests on my PC I have shared in my [previous posts](/sff-desktop). It has a a gigabit LAN connection.

I am on a HFC connection from Aussie Broadband. It goes through the NBN provided Arris CM8200 modem into my [OPNsense router](https://opnsense.org/). From there it goes to a [UniFi Switch 8-150W](https://www.ui.com/unifi-switching/unifi-switch-8-150w/) and then into my computer.

All connections are direct without any proxies or VPN connections unless specified.

During peak hours, the highest I achieved was 589 Mbps on speedtest.net. Any result here you can assume around a **40% reduction in speed** during peak hours.

## Speed Tests

I tested using [speedtest.net](https://speedtest.net), [fast.com](http://fast.com/) and [Google's speed test tool](https://www.google.com.au/search?q=speed+test).

### speedtest.net

<video autoplay loop controls width="100%" height="auto">
  <source type="video/webm" src="speedtest-peak.webm">
  <p>Your browser does not support the video element.</p>
</video>

During off-peak, I was able to max it out at 946 Mbps (118.25 MB/s) after a few tests.

I attempted the same tests while connected to [Mullvad's OpenVPN server and WireGuard server](https://mullvad.net/en/servers/) in Australia through OPNsense. I also performed the same test on my MacBook Pro through OpenVPN as a real-world example.

There is overhead when using a VPN service. WireGuard is faster than OpenVPN, however neither were able to break the 900 Mbps barrier.

When running OpenVPN directly on my MacBook I assume the CPU overhead and traffic hops was the reason it scored so low.

| Connection           | Speed               |
|:---------------------|:--------------------|
| Direct               | 118 MB/s (946 Mbps) |
| OpenVPN (OPNsense)   | 100 MB/s (803 Mbps) |
| Wireguard (OPNsense) | 107 MB/s (856 Mbps) |
| OpenVPN (MacOS)      | 78 MB/s (624 Mbps)  |

During peak hours, my speed went down to around ~589 Mbps. It was of useable of course.

<video autoplay loop controls width="100%" height="auto">
  <source type="video/webm" src="speedtest-offpeak.webm">
  <p>Your browser does not support the video element.</p>
</video>


### fast.com

<video autoplay loop controls width="100%" height="auto">
  <source type="video/webm" src="fast.com.webm">
  <p>Your browser does not support the video element.</p>
</video>

I got much better results using [fast.com](http://fast.com/) with it hitting 1 Gbps. Uploads were pretty good as well.

### Google Speed Test

<video autoplay loop controls width="100%" height="auto">
  <source type="video/webm" src="google-speed-test.webm">
  <p>Your browser does not support the video element.</p>
</video>

Google showed similar results to the other two.

## Usenet

I wasn't able to achieve such impressive results with Usenet. It could be because most servers are US or EU based.

| Provider                                        | Network             | Speed              |
|:------------------------------------------------|:--------------------|:-------------------|
| [Newsdemon](http://www.newsdemon.com/)          | UsenetExpress       | 37 MB/s (297 Mbps) |
| [Usenet.Farm](http://usenet.farm/)              | Omicron             | 44 MB/s (352 Mbps) |
| [UsenetBucket](https://www.usenetbucket.com/)   | XLned (Omicron)     | 29 MB/s (232 Mbps) |
| [Eweka](https://www.eweka.nl/)                  | Eweka (Omicron)     | 45 MB/s (360 Mbps) |
| [TweakNews](https://www.tweaknews.eu/)          | TweakNews (Omicron) | 41 MB/s (328 Mbps) |
| [Newsgroup Ninja](https://www.newsgroup.ninja/) | HW Media (Omicron)  | 40 MB/s (320 Mbps) |

## JDownloader

While downloading from Zippyshare with a free account, I was able to max out the connection before it started slowing down due to reduced connections:

<video autoplay loop controls width="100%" height="auto">
  <source type="video/webm" src="jdownloader.webm">
  <p>Your browser does not support the video element.</p>
</video>

With [Premiumize](https://www.premiumize.me/) within [JDownloader](https://jdownloader.org/), it sustained a good speed throughout.

![](jdownloader.png)


## Samsung Firmware

Using [Frija](https://forum.xda-developers.com/t/tool-frija-samsung-firmware-downloader-checker.3910594/), I was able to max out my connection while downloading a firmware update for my Galaxy S10+. It maintained this connection for the entire download.

<video autoplay loop controls width="100%" height="auto">
  <source type="video/webm" src="samsung.webm">
  <p>Your browser does not support the video element.</p>
</video>

## Ubuntu ISO

A good real-world example is to download the [Ubuntu Desktop ISO](http://mirror.aarnet.edu.au/pub/ubuntu/releases/20.04.1/ubuntu-20.04.1-desktop-amd64.iso). It's 2.6GB and downloading it through Google Chrome got it up to around ~70 MB/s.

<video autoplay loop controls width="100%" height="auto">
  <source type="video/webm" src="chrome-ubuntu.webm">
  <p>Your browser does not support the video element.</p>
</video>

Doing the same download through [Internet Download Manager](http://internetdownloadmanager.com/) with 32 separate connections maxed this out to 120 MB/s.

<video autoplay loop controls width="100%" height="auto">
  <source type="video/webm" src="idm-ubuntu.webm">
  <p>Your browser does not support the video element.</p>
</video>


## YouTube

I can watch videos at 4K60 quality with 2x speed without any buffering. It was also an issue when I was on NBN 100.

For this test, I opened up the 'Stats for Nerds' page while watching [TWICE 'CRY FOR ME' Choreography - 2](https://www.youtube.com/watch?v=bkQw-F1QTq4).

I would sometimes see it going above 500 Mbps but generally sat around 100 Mbps to 300 Mbps.

<video autoplay loop controls width="100%" height="auto">
  <source type="video/webm" src="youtube.webm">
  <p>Your browser does not support the video element.</p>
</video>

## Steam

Steam downloads averaged around 75 MB/s. For CS:GO, it was CPU bottlenecked as Steam uncompresses the game files while downloading and I could see my CPU usage at 99%. When it wasn't limited by this, it peaked at 97.6 MB/s.

<video autoplay loop controls width="100%" height="auto">
  <source type="video/webm" src="steam.webm">
  <p>Your browser does not support the video element.</p>
</video>

The highest speed was achieved when downloading a CS:GO patch at 99.7 MB/s.

![](steam.png)

## Torrents

I tested downloading torrents using qBittorrent. For my test, I'm downloading Ubuntu again through the [official torrent](http://mirror.aarnet.edu.au/pub/ubuntu/releases/20.04.1/ubuntu-20.04.1-desktop-amd64.iso.torrent). My torrent listening port is also closed.

<video autoplay loop controls width="100%" height="auto">
  <source type="video/webm" src="torrent.webm">
  <p>Your browser does not support the video element.</p>
</video>

However, on other torrents with even higher seeds/peers, I hover around ~10MiB/s. This could be because of my closed listening port.

![](torrent.png)

## Conclusion

NBN 1000 is fast, but only in demanding situations. In day to day browsing and working from home, I haven't felt a difference. Ping times also stayed relatively the same.

During peak hours, download speeds are 40% slower. That is a scam. When I was on NBN 100, the speed would drop from 95 to around 75-85 Mbps but nothing as dramatic as this.

NBN 250 would be more than enough for me in the future. NBN 100 was buffering when watching YouTube 4K60 quality videos at 2x speed.
