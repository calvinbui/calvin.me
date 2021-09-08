---
title: "Blog Updates"
categories:
- Blog
tags:
- gatsby
# https://www.iconfinder.com/icons/728898/page_folder_add_plus_file_create_new_icon
thumbnail: thumbnail.svg
---

A few more changes building on top of [my previous post](/now-powered-by-gatsby).

<!-- more -->

## Better Search

Searching is now a partial search instead of a sub-string search

![](search.png)

## Comment System

I've moved off [Disqus](https://disqus.com/) over to [Remark42](https://github.com/umputun/remark42). This is to be more privacy friendly.

![](remark42.png)

## Serve Fonts Locally

Another change to be more privacy friendly. [Google's Roboto font](https://fonts.google.com/specimen/Roboto) is now being served from this website.

![](roboto.png)

## Use Netlify for Builds

Netlify can also build this website in addition to serving it on their CDN. This removes the need to use Gatsby Cloud which had little benefit besides the Lighthouse Auditing.

![](netlify.png)

## Delete Cloudflare

Another privacy change. Proxying through Cloudflare gave me a TLS/SSL certificate but also meant Cloudflare was injecting it's own analytics into each page.

![](cloudflare.png)

To combat this I switched my DNS and cert over to Netlify. Netlify already builds the site (above) and it's CDN is more or less the same as proxying through Cloudflare. Netlify is also able to provide a cert through Let's Encrypt once I changed my DNS Nameservers over to them.
