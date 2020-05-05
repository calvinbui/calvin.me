---
author: Calvin Bui
comments: true
layout: post
slug: dns-entries-for-private-domain
title: Public DNS Entries for an Internal or Private Domain
categories:
- Networking
image: /assets/images/2018-08-17-dns-entries-for-private-domain/featured-image.jpg
images:  /assets/images/2018-08-17-dns-entries-for-private-domain/
---

Nothing. You should have zero public DNS entries for a domain purchased for private or internal use.

<!-- more -->

- Exposes your infrastructure to the outside world.
- Your **internal DNS** server will handle resolution
- It's for *private use*. Why does there need to be anything made public?
- Use subdomains `.internal` if you really want public DNS entries.
