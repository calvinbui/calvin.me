---
title: NZBmegasearcH NGINX Reverse Proxy
categories:
-   Computers
-   Web
tags:
-   nzbmegasearch
-   nginx
-   apache
-   reverse
-   proxy
-   usenet
thumbnail: thumbnail.png
---

[NZBmegasearcH](http://pillone.github.io/usntssearch/) is a great program. It aggregates all the sites I regularly visit to find an NZB to just one place. CouchPotato and SickBeard can also retrieve results from it instead of querying multiple locations for updates. One thing it doesn't do well is being compatible with reverse proxy which [0byte admits](https://github.com/pillone/usntssearch/issues/91#issuecomment-27147551). But that doesn't mean its impossible!

<!-- more -->

It took me two days to figure this out. A lot of 'sudo service nginx restart' and 'CTRL + SHIFT + R' presses. To sum up experiences:

*   NGINX cannot proxy it
*   Apache can proxy it
*   NGINX can proxy Apache
*   NGINX can proxy SSL Apache

Did you get that? This guide is for users running NGINX as their proxy instead of Apache. If you're using Apache, jump to my configuration file for your answer!

Let's run through how my setup works.

## My Setup

In my environment the proxy server is a different host from NZBmegasearcH. My proxy server connects to all my Usenet applications which are all on different virtualised hosts. Here's a little picture to help you out with that:

_Only my proxy server is exposed to the Internet. It connects to other hosts when accessing applications._:

![proxy configuration nzbmegasearch](capture5.png)

## Apache Proxy Install

**1.** I recommend you pull my fork of [NZBmegasearcH. ](https://github.com/calvinbui/usntssearch)I've fixed a  few errors in code such as SSL problems, favicons not showing in proxy and dropdown arrows not displaying.

**2.** Install Apache 2 on to the NZBmegasearcHhost. DigitalOcean have a [terrific guide](https://www.digitalocean.com/community/tutorials/how-to-set-up-apache-with-a-free-signed-ssl-certificate-on-a-vps) on installing Apache with SSL configuration.

**3.** Let's try to get NZBmegasearcH up and running on its own local proxy using Apache. I found that NGINX couldn't do this for whatever reason. You just want it to show any content for now, it doesn't have to be perfect and styled. This is my Apache configuration at _/etc/apache2/sites-enabled/000-default.conf_. Thanks to [goatysix](http://www.reddit.com/r/usenet/comments/2cz2tk/nzbmegasearch_reverse_proxy/) for this configuration.

```apacheconf
<VirtualHost *:80>

ServerAdmin webmaster@localhost
DocumentRoot /var/www/html

ErrorLog ${APACHE_LOG_DIR}/error.log
CustomLog ${APACHE_LOG_DIR}/access.log combined

</VirtualHost>

<VirtualHost *:443>
  SSLEngine on
  SSLCertificateFile /etc/apache2/ssl/server.crt
  SSLCertificateKeyFile /etc/apache2/ssl/server.key
</VirtualHost>

<Location /nzbmegasearch>
  ProxyPass http://localhost:5000
  ProxyPassReverse http://localhost:5000
</Location>

<Location /nzbmegasearch/api>
  Satisfy Any
  Allow from all
</Location>

<Location /nzbmegasearch/warp>
  Satisfy Any
  Allow from all
</Location>
```

Apache is proxy passing NZBmegasearcH on **localhost:5000** over to **/nzbmegasearch**. Save and restart Apache then browse over to [http://apache2host/nzbmegasearch/](http://apache2host/nzbmegasearch/) to give it a try. Don't forget the trailing slash (/) or it may not load the stylesheets!

If it works, let's move onto the next step.

## NZBmegasearcH Configuration

Within NZBmegasearcH there is an option to set the Reverse proxy directory located in the 'Connectivity' section. I found that you have to put the full URL for this to work.

[![connectivity proxy](capture6.png)](capture6.png)

This means the URL you will be accessing it from including the protocol, domain and path. So if you were accessing it over _HTTPS_, your domain is _mydomain.com_ and the path will be _/search_ then you will have to put in '_https://mydomain.com/search_'. Save and restart NZBmegasearcH after you have done this.

After it restarts, when attempting a search it will redirect you to your new URL + whatever you had searched for. This is a good sign, even though it doesn't work. Now we'll get NGINX to proxy Apache to retrieve the right location.

## NGINX Configuration

More or less a simple 'proxy_pass' to the Apache URL you accessed earlier.

```nginx
location /nzbmegasearch {
  #put your apache URL you used earlier to access NZBmegasearcH
  proxy_pass https://apache2host/nzbmegasearch/;
}
```

Save and restart NGINX once you're done.

## Try It Out

If all goes well, simply browsing over to the reverse proxy URL (e.g. the one we specified earlier _https://mydomain.com/search/_) will bring up NZBmegasearcH! Don't forget the trailing slash (/) or it may not apply the stylesheets. Try performing a search and sending it to SABnzbd. The Apache locations for '_api'_ and '_wrap'_ should have you covered.

I found an issue if you use HTTP authentication on Apache or NGINX. SABnzbd would be get notified to download a file from  '/nzbmegasearch/warp' but won't be able to access it due to the authentication required. A simple workaround is to just allow the path through.

```nginx
location /nzbmegasearch {
  include           auth.conf;
  proxy_pass        https://apache2host/nzbmegasearch/;
}

location /nzbmegasearch/warp {
  #disable authentication include           auth.conf;
  proxy_pass        https://apache2host/nzbmegasearch/warp;
}
```

## Let's Wrap It Up

What we've done is have NGINX proxy access a Apache Proxy accessing NZBmegasearcH. There is [little benefit in enabling HTTPS](http://security.stackexchange.com/questions/48892/is-there-a-benefit-to-having-ssl-connections-on-localhost) on NZBmegasearcH as it is on the localhost with Apache. I couldn't get that to work though, but if does for you let me know! If you were running Apache as your Proxy Server then this whole tutorial was moot.

Luckily the other Usenet programs out there aren't as complicated to reverse proxy and generally you will find a lot of configurations posted online for both NGINX and Apache, maybe even Lighttpd and IIS?
