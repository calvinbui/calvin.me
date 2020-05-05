---
author: Calvin Bui
comments: true
layout: post
slug: wordpress-to-jekyll
title: Now powered by Jekyll
categories:
- Blog
image: /assets/images/2016-12-01-wordpress-to-jekyll/featured-image.jpg
images:  /assets/images/2016-12-01-wordpress-to-jekyll/
---

I've made the leap over from WordPress to Jekyll. Static sites are just easier, faster and more secure :thumbsup:

<!-- more -->

Honestly, what hasn't been said about Jekyll? Static sites are definitely the way to go. I've been hearing about vulnerabilities in [WordPress](https://wpvulndb.com/) and [Drupal](https://www.drupal.org/security) on and off, even more so since listening to security podcasts like [Risky Biz](http://risky.biz/).

What I never thought I'd say is my site is now somewhat...open-source? You can find all of its code on my GitHub project [calvinbui/calvin.me](https://github.com/calvinbui/calvin.me). There, you can find some drafts I'm working on as well if you want to spoil yourself.

To sum up my own experience for the transition:

* Was a pain to get it transitioned properly, [total time 1.5 weeks](https://github.com/calvinbui/calvin.me/graphs/commit-activity)
* Used [exitwp](https://github.com/thomasf/exitwp) to convert it over, not a perfect tool.
* exitwp didn't run too well on Windows, had to use a Linux machine.
* exitwp didn't like how my site was self-hosted, had to transition it over to WordPress.com first.
* Images did not link properly but with some magic find and replace regex I was able to link them all properly.
* Images with captions did not display properly as they weren't supported, [but I overcame that](https://github.com/calvinbui/calvin.me/commits/master/_includes/caption.html)
* WordPress galleries did not transition over.
* No Jekyll themes supported a 'featured-image' of any sort. [This was also added manually by me.](https://github.com/calvinbui/calvin.me/commit/0d674dc8ac464c9e648d29ddbc69412f1db12651)
* Code blocks and lists didn't go well together. [This was worked around by just not using lists.](https://github.com/calvinbui/calvin.me/commit/72755d82330af82a411cf3bbd6d117d1514c5d5f)
* The [GitHub pages gem](https://github.com/github/pages-gem) is running into issues at the moment so the whole time what I was seeing locally was different from what eventually appeared.
* Creating pull requests led to [GitHub unicorning](https://github.com/503.html). I believe it was because I forked from the [Jekyll Now theme](https://github.com/barryclark/jekyll-now) so I had to just start fresh to get rid any issues there.
* YouTube embeds worked with some tweaking to [stretch them out a little](https://benmarshall.me/responsive-iframes/).
* [Moving comments](https://help.disqus.com/customer/portal/articles/466255-importing-comments-from-wordpress) over from Disqus was easy enough.
* The list of [approved plugins](https://pages.github.com/versions/) is appalling. Couldn't make use of the [Jekyll Archives plugin](https://github.com/jekyll/jekyll-archives) to create categories.
* At least the site is faster? \(not really\)

I'm happy with how it eventually turned out despite the trouble. It is much simpler to read and make changes to. I don't need a slew of plugins to get everything running perfectly like on WordPress, because it just works.

Other notes:

* Security is not as big of a concern, the only way in is through GitHub, CloudFlare or Namecheap.
* Response and speeds are now managed by GitHub and CloudFlare CDNs.
* Free hosting I guess?
* This list probably repeats what everyone else has already said :pensive:
