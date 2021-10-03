---
title: HTTP/2 Blog Speed Test
categories:
- Web
tags:
- http
- speed test
# https://www.iconfinder.com/icons/4263544/browser_fast_http/2_http2_loading_speed_window_icon
thumbnail: thumbnail.svg
---

Last week I updated the backend NGINX web servers to support HTTP/2. Now to find out how much difference it makes.

<!-- more -->

NGINX first supported HTTP/2 with it's [1.9.5 mainline release back in September 2015](https://www.nginx.com/blog/nginx-1-9-5/) after a [alpha patch release in August](https://www.nginx.com/blog/early-alpha-patch-http2/). At time of writing, the stable version of NGINX is 1.8.1 and does not yet support HTTP/2.

Adding HTTP/2 support was very simple, just one extra word, as noted in the above blog or within the [module's documentation](http://nginx.org/en/docs/http/ngx_http_v2_module.html).

## Test Configuration

### Browser

Firefox 45.0.1 will be used to perform the tests. Firefox is preferable over browsers as it is possible to toggle on and off HTTP/2 and SPDY through the about:config page. To do this, set the value of '**security.ssl.enable_alpn**' and '**network.http.spdy.enabled.http2**' to **false**

![FF](ff.png)

### Computer

I will be running the tests on my Lenovo X220

* Intel i7-2640M
* 16GB RAM
* Windows 10 64-bit

### Network

Internet is currently a 100/12 megabit cable connection provided by Telstra

## Testing Methodology

To find out quickly a page runs, the built-in Network Developer Tools (CTRL + Shift + Q) in Firefox is able to provide page statistics. On this page, clicking the stats in the bottom right corner will bring up a speed test with and without cache. I will be using this 20 times and get an average number. After each run I will clear all browsing data in Firefox and restart the browser. Nothing scientific happening here :P

![http2 speed](http2-speed.png)

## Results

![http1 header](http1-header-300x262.png)

| Run     | HTTP/2 | HTTP/1.1 |
|---------|--------|----------|
| 1       | 2.60   | 3.07     |
| 2       | 2.21   | 2.77     |
| 3       | 2.90   | 2.93     |
| 4       | 3.16   | 3.15     |
| 5       | 2.70   | 2.87     |
| 6       | 2.73   | 2.87     |
| 7       | 2.67   | 3.39     |
| 8       | 2.59   | 3.19     |
| 9       | 2.16   | 3.30     |
| 10      | 2.87   | 3.46     |
| 11      | 3.45   | 4.20     |
| 12      | 2.37   | 1.96     |
| 13      | 2.62   | 2.81     |
| 14      | 2.51   | 2.75     |
| 15      | 2.39   | 2.80     |
| 16      | 2.55   | 3.95     |
| 17      | 1.36   | 3.34     |
| 18      | 2.65   | 3.66     |
| 19      | 2.44   | 2.15     |
| 20      | 2.49   | 2.83     |
| Average | 2.57   | 3.07     |
| Median  | 2.60   | 3.00     |

## Conclusion

Roughly a half-second increase in speed on the home page. Currently this site is being optimised for HTTP/1.1 with techniques such as file concatenation by combining multiple CSS and JS files together. This can hurt performance in HTTP/2 and is not considered a best practice. This practice is favourable in HTTP/1.1 as the browser is only able to open one connection at any time  and received sequentially.HTTP/2 allows each request to the server to use its own TCP connection, known as multiplexing, and allows each request to be received in parallel resulting in a dramatic performance gain.

![http2-multiplexing](http2-multiplexing.png)

_Images from CloudFlare <https://www.cloudflare.com/http2/what-is-http2/>_:

![http2-network-graph-comparison](http2-network-graph-comparison.png)
