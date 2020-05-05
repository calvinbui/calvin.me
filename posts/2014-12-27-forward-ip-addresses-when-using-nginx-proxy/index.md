---

title: Forward IP Addresses with NGINX Proxy

categories:
- How-To
- Networking
- Web
tags:
- ip address
- nginx
- proxy
tags:
- 
thumbnail: thumbnail.png
---

I love nginx. I love how its lightweight, does what it does well and is [extremely **fast**](http://www.theorganicagency.com/apache-vs-nginx-performance-comparison/). Nginx has the ability to perform server blocks (virtual hosts in Apache) which is great, though causes problems when having to forward IP addresses within its proxy headers. There is a solution.

<!-- more -->

_Off-topic: This year ASIC blocked 250000 websites because its blacklisted websites based on their IP addresses instead of their domain name as they were running Virtual Hosts/Server Blocks! Quite a blunder when you get people that don't know how the Internet works to regulate it. [Read it here](http://www.abc.net.au/news/2014-08-27/asic-accidentally-blocked-250000-websites-ip-address/5701734). Take a stand against things like this - see what you can do at [https://stopthespies.org ](https://stopthespies.org/)as Australia plans to track and record your online movements (even physical moments on your mobile devices!)._

##### Edit the proxy configuration

First thing is to edit your proxy server block located on the proxy server. Here's what mine basically looks like:

```nginx    
# redirect calvin.me to https
server {
  listen      80 default_server;
  server_name calvin.me;
  return 301 https://calvin.me;
}

# redirect www prefix to https
server {
  listen      80;
  server_name www.calvin.me;
  return 301 https://www.calvin.me;
}

server {
  #listen 80;
  listen 443 ssl default_server;
  server_name calvin.me;
  ssl_certificate /etc/nginx/ssl/calvin.me.crt;
  ssl_certificate_key /etc/nginx/ssl/calvin.me.key;

  location / {
    proxy_set_header  Host $host;
    proxy_set_header  X-Real-IP $remote_addr;
    proxy_set_header  X-Forwarded-Proto https;
    proxy_set_header  X-Forwarded-For $remote_addr;
    proxy_set_header  X-Forwarded-Host $remote_addr;
    proxy_pass        http://wp.calvin.me;
  }
}
```

It's very important to include these three lines:

* Host: name and port of the proxied server.
* X-Real-IP: sends the visitor's IP address to your virtual host
* X-Forwarded-For: sends the visitor's IP address to your virtual host

##### Edit your proxied server configuration

Now on your proxied server's configuration you'll need to include three importants lines within the server block, but outside of any location blocks.

```nginx
server {
    #other junk here blah blah
    set_real_ip_from 10.0.0.0/8;
    real_ip_header X-Real-IP;
    real_ip_recursive on;

    location / {
       #some junk here
    }
}
```

The three lines are:

* set_real_ip_from: this tells nginx to grab the real visitor's IP from any proxy server within this range. This can also be a static IP address such as 10.0.9.2
* real_ip_header: nginx will pick out the client's IP address from the addresses its given
* real_ip_recursive: the proxy server's IP is replaced by the visitor's IP address

##### Example - I'm gonna the forward IP addresses !

The reason I posted this was because on this site, comments left by you guys were shown as coming from my proxy server (10.0.9.2), hiding everyone's IP address behind my own proxy server. Take a look

[![proxy comments]({{page.images}}comments-b4.png)]({{page.images}}comments-b4.png)

Now with the changes above...

[![comments work]({{page.images}}test.png)]({{page.images}}test.png)

The forwarded IP addresses is no longer my proxy server :smile:

Thanks to [Nick M from Server Fault](http://serverfault.com/questions/314574/nginx-real-ip-header-and-x-forwarded-for-seems-wrong). I literally searched this for a whole hour and I'm just expanding on what he's provided already.
