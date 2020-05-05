---
title: "OpenCore for ASUS ROG STRIX Z270-I"
thumbnail: featured-image.jpg
categories:
-   Computers
-   Hacking
tags:
-   hackintosh

thumbnail: thumbnail.png
---

OpenCore bootloader configuration and files for the ASUS ROG STRIX Z270-I GAMING motherboard.

<!-- more -->

Over the weekend I played around with the [OpenCore](https://github.com/acidanthera/OpenCorePkg) bootloader for Hackintosh.

I've uploaded all my configs, ACPI, drivers and kexts to GitHub. [You can find it here](https://github.com/calvinbui/Asus-STRIX-Z270i-Hackintosh).

Everything _I needed_ worked for me. Things that aren't working but I won't look into fixing at the moment:

-   USB Map: I enabled the `XhciPortLimit` option as a workaround
-   Audio: I use a USB audio interface
-   Wi-Fi: I use Ethernet
-   Bluetooth: No Bluetooth devices
-   NVIDIA GTX 1080Ti: Nothing I can do here until Apple and NVIDIA stop fighting.

All other details are on GitHub. Enjoy!

