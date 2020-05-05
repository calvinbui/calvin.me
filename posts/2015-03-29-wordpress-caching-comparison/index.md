---
title: WordPress Caching Comparison
categories:
-   Web
tags:
-   caching
-   speed
-   wordpress
# thumbnail: thumbnail.png
---

WordPress caching is the fastest way to improve website performance. Caching WordPress reduces server load by reducing the number of requests per page. For every single user that visits your site, data is retrieved from MySQL, processed with PHP and then displayed as HTML. This is a draining process if several hundred users at on your site at once. Caching saves the webpage into files which it shows visitors instead, not requiring MySQL or PHP which reduces load time significantly.

<!-- more -->

There are quite a few caching plugins for WordPress that I had to choose from. Therefore I decided to do a comparison **on this site** as a test. Results may vary depending on your own site, what themes and plugins you may have as well.

## WordPress Caching Plugins

Based on recommendations, popularity and reviews, I had a look at:

*   [Falcon Engine from Wordfence](http://docs.wordfence.com/en/Falcon_Cache)
*   [WP Rocket](http://wp-rocket.me/)
*   [W3 Total Cache](https://wordpress.org/plugins/w3-total-cache/)
*   [Hyper Cache](https://wordpress.org/plugins/hyper-cache/)
*   [Quick Cache](https://wordpress.org/plugins/quick-cache/)
*   [CloudFlare Rocket Loader](https://support.cloudflare.com/hc/en-us/articles/200168056-What-does-Rocket-Loader-do-)

## How I Tested

I thought I would test based on two factors, number of **website requests** and **response time**.

I decided to use [Pingdom's Website Speed Test](http://tools.pingdom.com/fpt/) as the main testing tool because it gave results quickly and there wasn't much fussing around.

[![Capture555]({{page.images}}capture555.png)]({{page.images}}capture555.png)

A total of 8 tests were taken for each plugin and the best 5 were selected to avoid many outliers.

Other reputable testing sites include:

*   [Webpage Test](http://www.webpagetest.org/)
*   [GTmetrix](http://gtmetrix.com/)
*   [Google's PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)

## Results (Requests / Response in seconds)

|---
| **Plugin** | **Average** | **Best** | **Median** | **Worse**
| CloudFlare | 54 / 2.34 | 54 / 1.23 | 56 / 2.96 | 55 / 3.07
| Falcon | 55 / 3.58 | 56 / 1.35 | 55 / 3.92 | 55 / 4.83
| WP Rocket | 34 / 2.63 | 32 / 2.25 | 35 / 2.53 | 35 / 3.90
| W3 Total Cache | 52 / 3.44 | 50 / 2.67 | 53 / 3.65 | 52 / 4.03
| Hyper Cache | 54 / 3.16 | 56 / 2.22 | 54 / 3.16 | 52 / 4.24
| Quick Cache | 55 / 3.10 | 56 / 2.11 | 56 / 3.23 | 53 / 4.07
{: .table }

[![average]({{page.images}}average.png)]({{page.images}}average.png)

[![response]({{page.images}}response.png)]({{page.images}}response.png)

## Conclusion

It's quite clear that using CloudFlare reduces response times significantly due to their built-in CDN. WP Rocket on the other hand is able to reduce requests tremendously whereas other plugins all hovered around the 55 mark. With those results, I would choose to use WP Rocket as my caching plugin with CloudFlare running in the background.
