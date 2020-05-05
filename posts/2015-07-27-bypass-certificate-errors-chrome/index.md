---
author: Calvin Bui
comments: true
date: 2015-07-27 17:34:09+00:00
layout: post

slug: bypass-certificate-errors-chrome
title: Bypass self-signed certificate errors on Google Chrome

categories:
- How-To
- Networking
- Server
tags:
- certificates
- chrome
- ssl
image: /assets/images/2015-07-27-bypass-certificate-errors-chrome/featured-image.jpg 
images: /assets/images/2015-07-27-bypass-certificate-errors-chrome/
---

Wasn't it annoying when Google Chrome suddenly made you do two clicks instead of one to bypass certificate errors?!

<!-- more -->

Chrome can remember decisions to proceed through certificate errors for a specified length of time of up to three months.

1. Enter **chrome://flags** into the address bar

	[![flags]({{page.images}}flags.jpg)]({{page.images}}flags.jpg)

2. Find '**Remember decisions to proceed through SSL errors for a specified length of time.**' It is about 3/4 of the way down the page. Use CTRL+F to make your life a little easier. 

	[![remember]({{page.images}}remember.jpg)]({{page.images}}remember.jpg)

3. Select '**Remember for three months**' in the drop-down. 

	[![dropdown]({{page.images}}dropdown.jpg)]({{page.images}}dropdown.jpg)

4. Relaunch Chrome as prompted. 

	[![relaunch]({{page.images}}relaunch.jpg)]({{page.images}}relaunch.jpg)

### Explanation of Certificate Errors

Browsers, like Internet Explorer, Firefox and Chrome will usually show these errors when they cannot trust the source of the certificate. This is seen as a privacy issue as they cannot establish a secure connection with the website.

The privacy issues are that the connection with the website may have been intercepted or it is misrepresenting itself (meaning it isn't the real website you're visiting). While on the Internet this is definitely an issue, your own certificates that you make for yourself and your web servers are never in doubt of being hijacked.

There are other reasons for certificate errors as well:

* the certificate has been revoked by the issuing certificate authority
* it is using a certificate for another website
* the certificate is out of date (or your computer date is wrong)
