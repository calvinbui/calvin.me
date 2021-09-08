---
title: "Testing NBN 250 Superfast"
categories:
- Networking
- Review
- Web
tags:
- nbn
- superfast
- internet
# https://www.iconfinder.com/icons/2817115/newyears_party_rocket_icon
thumbnail: thumbnail.svg
---

After [testing NBN 1000 in my previous post](/testing-nbn-1000-ultrafast), I concluded that NBN 250 would be more than enough for me. I'll be putting that to the test.

<!-- more -->

```toc
# This code block gets replaced with the TOC
```

## Churning to Superloop

After my [NBN 1000/50 deal from Aussie Broadband expired](https://www.ozbargain.com.au/node/587348), I churned over to [Superloop's NBN 250/25 plan for $30 off per month](https://www.ozbargain.com.au/node/626994). I scheduled the churn a day before my billing period ended and was ported over bright and early in the morning. There were no issues at all.

I've had a few drop-outs and extreme slowdowns during peak hours and support aren't available 24/7 (like Aussie Broadband) to help. This has been irritating as I'll get the canned response the next day to check my cables and computer. I won't be coming back after the current deal expires.

## NBN 250 / Home Superfast

NBN 250, officially known as [Home Superfast](https://www.nbnco.com.au/learn/speed#home-superfast), is a speed tier provided to households with a [Hybrid Fibre Coaxial (HFC)](https://www.nbnco.com.au/learn/network-technology/hybrid-fibre-coaxial-explained-hfc-3) or [Fibre to the Premises (FTTP)](https://www.nbnco.com.au/learn/network-technology/fibre-to-the-premises-explained-fttp) connections.

NBN 250 / Home Superfast's download speed is rated up to **250 Mbps** or **31.25 MB/s**. For upload speeds, plans offer either **25 Mbps** or **100 Mbps**.

## Test methodology

All tests performed were during peak hours (6 PM to 10 PM) during the Sydney coronavirus lockdown. This differs from my previous NBN 1000 test as they were performed off-peak. I want to show a real-world representation this time.

I ran the tests on my PC I have shared in my [previous posts](/sff-desktop). It has a gigabit LAN connection.

I am on a HFC connection from Superloop. It goes through the NBN provided Arris CM8200 modem into my [OPNsense router](https://opnsense.org/). From there it goes to a [UniFi Switch 8-150W](https://www.ui.com/unifi-switching/unifi-switch-8-150w/) and then into my computer.

All connections are **with** a Mullvad VPN connection in Sydney.

## Speed Tests

I tested using [speedtest.net](https://speedtest.net), [fast.com](http://fast.com/) and [Google's speed test tool](https://www.google.com.au/search?q=speed+test).

### speedtest.net

Speedtest.net was good even with the VPN and peak period overheads. I achieve a 247.03 Mbps download, 20.26 Mbps upload with 9 ms latency to the server.

<video autoplay loop controls width="100%" height="auto">
  <source type="video/webm" src="speedtest.webm">
  <p>Your browser does not support the video element.</p>
</video>

### fast.com

I got better results using [fast.com](http://fast.com/) with it hitting 250 Mbps. The upload speed was 18 Mbps and the latency was 12 ms which were a little worse than the speedtest.net results.

<video autoplay loop controls width="100%" height="auto">
  <source type="video/webm" src="fast.webm">
  <p>Your browser does not support the video element.</p>
</video>

### Google Speed Test

Finally, Google showed a similar result to the other two with a 239.7 Mbps download, 22.2 Mbps upload and 10 ms latency to the Sydney server

<video autoplay loop controls width="100%" height="auto">
  <source type="video/webm" src="google-speed-test.webm">
  <p>Your browser does not support the video element.</p>
</video>

## Usenet

I didn't have any free trials this time so I relied on my [Newsdemon](https://www.newsdemon.com/) connection. Newsdemon is part of the [UsenetExpress backbone](https://old.reddit.com/r/usenet/wiki/providers#wiki_usenetexpress).

The [NZBGet](https://nzbget.net/) download speed sat around 27 MB/s the entire time. Previously I was sitting around 35-40 MB/s on NBN 1000. This better saturates the connection. The remaining MB/s I'm missing could be because the servers are US or EU based.

<video autoplay loop controls width="100%" height="auto">
  <source type="video/webm" src="nzbget.webm">
  <p>Your browser does not support the video element.</p>
</video>

## JDownloader

Using [JDownloader](https://jdownloader.org/), I downloaded a heap of files from Zippyshare with a free account. I was able to max out the connection before it started slowing down due to reduced connections. This is the same test I did for NBN 1000.

<video autoplay loop controls width="100%" height="auto">
  <source type="video/webm" src="jdownloader.webm">
  <p>Your browser does not support the video element.</p>
</video>

## Samsung Firmware

Using [Frija](https://forum.xda-developers.com/t/tool-frija-samsung-firmware-downloader-checker.3910594/), I was able to max out my connection while downloading a firmware update from Samsung's servers for my Galaxy S10+. It maintained this connection for the entire download.

<video autoplay loop controls width="100%" height="auto">
  <source type="video/webm" src="frija.webm">
  <p>Your browser does not support the video element.</p>
</video>

## Ubuntu ISO

A good real-world example is to download the [Ubuntu Server ISO](http://mirror.aarnet.edu.au/pub/ubuntu/releases/20.04.2/ubuntu-20.04.2-live-server-amd64.iso). It's 1.1GB and downloading it through Google Chrome got it up to around ~26 MB/s before slowing down.

<video autoplay loop controls width="100%" height="auto">
  <source type="video/webm" src="ubuntu-chrome.webm">
  <p>Your browser does not support the video element.</p>
</video>

Doing the same download through [Internet Download Manager](http://internetdownloadmanager.com/) with 32 separate connections got it anywhere between 11 to 26 MB/s.

<video autoplay loop controls width="100%" height="auto">
  <source type="video/webm" src="ubuntu-idm.webm">
  <p>Your browser does not support the video element.</p>
</video>

## YouTube

I can watch videos at 4K60 quality with 2x speed without any buffering. It was also an issue when I was on NBN 100.

For this test, I opened up the 'Stats for Nerds' page while watching [TWICE 'CRY FOR ME' Choreography - 2](https://www.youtube.com/watch?v=bkQw-F1QTq4) at 2x speed.

The connection speed generally sat around 160 Mbps.

<video autoplay loop controls width="100%" height="auto">
  <source type="video/webm" src="youtube.webm">
  <p>Your browser does not support the video element.</p>
</video>

## Steam

Steam downloads averaged around 15 MB/s with a peak of 19 MB/s.

<video autoplay loop controls width="100%" height="auto">
  <source type="video/webm" src="steam.webm">
  <p>Your browser does not support the video element.</p>
</video>

## Torrents

I tested downloading torrents using qBittorrent. For my test, I'm downloading Ubuntu again through the [official torrent](http://mirror.aarnet.edu.au/pub/ubuntu/releases/20.04.2/ubuntu-20.04.2.0-desktop-amd64.iso.torrent). My torrent listening port is open. The torrent did very poorly, averaging 2.6 MB/s. I would put this down as an outlier.

<video autoplay loop controls width="100%" height="auto">
  <source type="video/webm" src="qbittorrent.webm">
  <p>Your browser does not support the video element.</p>
</video>

## Conclusion

I feel that NBN 250 is more than enough as I predicted in my previous post. Since switching from NBN 1000, in day to day browsing and working from home, I haven't felt a difference. I wouldn't go down to NBN 100 however as it was buffering YouTube playback at 4K60 at 2x speed.
