---
title: Public DNS Entries for an Internal or Private Domain
categories:
- Networking
tags:
- dns
# https://www.iconfinder.com/icons/1329080/burger_list_menu_numbers_string_text_icon
thumbnail: thumbnail.svg
---

Nothing. You should have zero public DNS entries for a domain purchased for private or internal use.

<!-- more -->

- Exposes your infrastructure to the outside world.
- Your **internal DNS** server will handle resolution
- It's for *private use*. Why does there need to be anything made public?
- Use subdomains `.internal` if you really want public DNS entries.
