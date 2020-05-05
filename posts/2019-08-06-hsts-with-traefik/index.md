---
title: HSTS with Traefik
categories:
- Web
- Networking
- How-To
- Security
tags:
- 
thumbnail: thumbnail.png
---

The settings to get an A+ rating on SSL Labs!

<!-- more -->

I didn't find any simple guide out there to do this so I thought I'd write it myself.

# Traefik HSTS Configuration

The Traefik documentation talks about HSTS headers in [only one place](https://docs.traefik.io/basics/#security-headers) and it doesn't even provide an example for it. All Traefik security headers, including HSTS, can be found can be found at a separate GitHub repo: [unrolled/secure](https://github.com/unrolled/secure#available-options).

Add the following Docker labels to your container or your `traefik.toml` file's frontend:

```yaml
traefik.frontend.headers.STSSeconds: "31536000"
traefik.frontend.headers.STSIncludeSubdomains: "true"
traefik.frontend.headers.STSPreload: "true"
```

While you're there, only accept the latest ciphers. This can be configured on the HTTPS entrypoint:

```toml
[entryPoints]
  [entryPoints.http]
    address = ":80"
    [entryPoints.http.redirect]
    entryPoint = "https"
  [entryPoints.https]
    address = ":443"
    [entryPoints.https.tls]
      minVersion = "VersionTLS12"
      cipherSuites = [
        "TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256",
        "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384",
        "TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305"
      ]
```

![]({{page.images}}ssllabs-result.jpg)

# What is HSTS?

**HTTP Strict Transport Security (HSTS)** tells browsers that your site should _ONLY_ be accessed with **HTTPS** instead of **HTTP**. After the initial connection over **HTTPS**, your browser will never load the site using **HTTP** and will attempt to convert all connections using **HTTP** to **HTTPS** instead.

# Websites

Some other websites to check your HTTPS configuration as well as other web features:

- [SSL Labs](https://www.ssllabs.com/ssltest/) is the de-facto place to test your site's SSL configuration
- [Cipherli.st](https://cipherli.st/) provide settings for Apache, NGINX and Lightppd
- [SSL Decoder](https://ssldecoder.org) provides similar tests as SSL Labs
- [Observatory by Mozilla](https://observatory.mozilla.org/) is tester that can do HTTP, TLS, SSH
- [CryptCheck](https://tls.imirhil.fr/) is a site that tests HTTPS, SMTP and XMPP
- [Immuni Web](https://www.immuniweb.com/free/) provide free tests for website security, mobile app security, SSL and phishing.
- [Security Headers](https://securityheaders.com) checks for headers in your site and gives it a rating
- [Mozilla provide all these settings already](https://ssl-config.mozilla.org) but for some reason there's no easy guide out there, so I made one.
