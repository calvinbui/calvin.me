---
title: Choosing a VPN Service
categories:
-   Security
-   Privacy
tags:
-   vpn
# thumbnail: thumbnail.png
---

The entire process and tough criteria I went through to pick a VPN provider and escape mass surveillance.

<!-- more -->
# Criteria
Picking a VPN provider and going on my way merry way around the Internet is a pipe dream. Speed, privacy and tracking are still a concern.

When picking a provider I had a few things I needed:

-   [Not part of the fourteen eyes](https://restoreprivacy.com/5-eyes-9-eyes-14-eyes/): This throws out a bunch of names like PIA and ExpressVPN (they're not great either). Even though PIA has proved themselves in court, I have suspicions the Government is playing 4D chess by making this VPN so popular.
-   Sydney servers: Close to home, faster speeds and lower ping
-   At least 100Mbp/s download: I'm testing this via speedtest.net. Not the most scientific.
-   P2P allowed
-   At least >=3 connections allowed at once. One for OPNsense, one for my mobile and another one just in case I need it
-   No bandwidth logs, timestamp logs, IP address logs, DNS requests, traffic logs. No logs.
-   OpenVPN support

Each provider has their own privacy concerns, if staying secure from your ISP wasn't enough you have to make sure the VPN provider also doesn't know what you're doing.

# VPN Comparison

Luckily, the Internet comes to the rescue. All the criteria above can be filtered thanks to [That One Privacy Site](https://thatoneprivacysite.net/vpn-section/).

With the all the above filtering I was left with:

-   [Boxpn](https://boxpn.com/)
-   [Ivacy](https://www.ivacy.com/)
-   [Proxy.sh](https://proxy.sh/)
-   [VPN.ht](https://vpn.ht/)
-   [ZorroVPN](https://zorrovpn.com/?lang=en)

I also extended the test out to VPNs within 'fourteen eyes' as recommended by [privacytools.io](https://www.privacytools.io/providers/vpn/) and was given:

-   [Mullvad](https://mullvad.net/en/)
-   [FrootVPN](https://frootvpn.com/)

# Speed Test

As unscientically as the come, the testing methodology was:

-   https://www.speedtest.net/
-   AARNet server
-   Multi connections option
-   3 runs with an average taken

![]({{page.images}}speedtest.PNG)

| Provider             | Ping | Download | Upload | Fourteen Eyes Country |
|----------------------|------|----------|--------|-----------------------|
| No VPN (Telstra)     | 11   | 115.71   | 5.06   | Five                  |
| BoxPN                | 12   | 88.1     | 4.7    | No                    |
| FrootVPN             | 12   | 95.87    | 4.68   | Fourteen              |
| Ivacy                | 12   | 110.11   | 4.93   | No                    |
| Mullvad Sydney 1     | 11   | 110.82   | 4.9    | Fourteen              |
| Mullvad Sydney 3     | 12   | 113.11   | 4.95   | Fourteen              |
| Proxy.sh Australia 1 | 0    | 0        | 0      | No                    |
| Proxy.sh Australia 2 | 13   | 31.82    | 4.48   | No                    |
| Proxy.sh Australia 3 | 0    | 0        | 0      | No                    |
| Proxy.sh Australia 4 | 15   | 21.57    | 4.3    | No                    |
| VPN.ht               | 121  | 98.6     | 2.91   | No                    |
| ZorroVPN             | 13   | 65.19    | 4.9    | No                    |

As I mentioned before, I wanted at least 100Mbps download and the providers that met that were:
-   Ivacy
-   Mullvad

# Refund Policy

Luckily for me, each VPN provider listed had a money-back guarantee which I took them upon. This was used as an indicator of how ethical they were. I paid using PayPal so I could use them to step in for a refund if needed.

| Provider | Days to refund  | Time taken |
|--------- |-----------------|------------|
| BoxPN    | 7               | 1          |
| FrootVPN | 30              | 2          |
| Ivacy    | 30              | 1          |
| Mullvad  | 0 (1 day trial) | 0          |
| Proxy.sh | 7               | TBA        |
| VPN.ht   | 30              | 1          |
| ZorroVPN | 7               | TBA        |

# The Decision

It came down to **Ivacy** or **Mullvad** due to speed.

Mullvad comes [highly commended](https://thatoneprivacysite.net/2017/10/03/mullvad-review/). My only concern is it's part of the fourteen eyes but both That One Privacy Guy and privacytools.io are okay with that. Mullvad do [clearly outline how they don't log any info](https://mullvad.net/en/guides/no-logging-data-policy/), but saying what you do and doing it can be different. This is still better than 99% of providers that just write 'we don't log'.

Ivacy on the otherhand is a bit sketchy. They [tried bribing That One Privacy Guy](https://thatoneprivacysite.net/2016/05/24/old-the-story-of-how-a-certain-vpn-company-tried-bribing-me/). Ivacy is also a sub-brand/rebrand of PureVPN, which is a provider that has been [busted keeping logs](https://www.bleepingcomputer.com/news/security/cyberstalking-suspect-arrested-after-vpn-providers-shared-logs-with-the-fbi/). So in reality, Ivacy does keep logs as PureVPN keep logs. **Stay away.**

There is no perfect answer, but **Mullvad** is as close as it comes. My reason for a VPN is to escape mass surveillance. Mullvad keeps no logs, provides strong encryption, offers great speeds and are big on anonymity. While being in the 'fourteen eyes' is a concern, there isn't anything stopping anybody from starting a VPN company in any other country either. My criteria was at least not within the 'five' or 'nine' eyes.
