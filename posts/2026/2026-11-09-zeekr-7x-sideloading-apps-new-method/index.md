---
title: New Zeekr 7X Sideloading Method
categories:
- Hardware
tags:
- android
- car
- sideloading
- zeekr
- zeekr 7x
# https://icon666.com/icon/car_reab3ck2dt1s
---

The method I found for [sideloading Android apps on my Zeekr 7X](/zeekr-7x-sideloading-apps/) has been patched, but there is a new way in.

<!-- more -->

The old method relied on highlighting text on [magic.sandboxcar.com](https://magic.sandboxcar.com/) to escape the App Labs browser sandbox. The page now sets the CSS properties `user-select: none` and `-webkit-touch-callout: none` across the whole page, which disables text selection and the long-press menu, so there is nothing left to highlight.

The new method is simpler than the old one. Instead of escaping through that page, I install YouTube and use its web search to reach a browser. From there, the rest of the process is the same as before: follow the steps in the [previous video](https://www.youtube.com/watch?v=ve_rzkdrjZI) to install a normal browser and download APK files.

This is still an unofficial method and is not supported by Zeekr. Follow it at your own risk.

<iframe src="https://www.youtube.com/embed/H--KxI_1q9M" allowfullscreen width="1280" height="720"></iframe>
