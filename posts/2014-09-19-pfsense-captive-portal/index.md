---
title: My pfSense Captive Portal
categories:
-   Web
-   Networking
tags:
-   pfsense
-   captive portal
thumbnail: thumbnail.png
---

A Captive Portal is a special webpage users see before using the Internet. It will intercept network packets  and when users try to access a webpage it prompt them to login. My personal captive portal utilises pfSense's own Captive Portal features to authenticate users before they begin using the Internet.

<!-- more -->

## The Idea

I use a captive portal on my guest network for people who  are temporary/one time visitors that require Internet-only access. pfSense can utilise a variety of authentication techniques on the Captive Portal including:

* No authentication (just captive portal page)
* pfSense User Accounts (must be created)
* Vouchers (similar to a Library)
* RADIUS server (we're not even going there)

My portal utilises the pfSense User Accounts method but in a unique way - a user enters only the username, the password field is already filled and hidden. This means they only need to enter the special word which is being disguised as a username for those that don't know better. A little hacky but works very well when other methods have no security, require me setting up accounts, build a RADIUS server or make a voucher. User Accounts also allow concurrent (multiple) logins so all users can simply use one account simultaneously.

## The Captive Portal

* Works on desktops, mobiles and tablets
* Built on Twitter Bootstrap
* Parallax Background effect
* Network Usage Agreement
* Error Page when unsuccessful
* Success page when successful

## How to Use the Captive Portal

1. Download the files from my [GitHub](https://github.com/calvinbui/pfsense-captive-portal).
2. Make any changes necessary e.g. authentication or use it the way I do and create a new User account with the password 'password'.
3. Upload the 'index.html' for Portal page contents.
4. Upload the 'error.html' for Authentication error page contents.
5. Upload the rest of the files with the pre-fix 'captiveportal-' into the File Manager.

![captive portal file manager](capture2.png)

## Proposed Updates

* Variety of authentication pages to match different usages.
* Logout page
* Logout popup window
