---
title: Personal Wiki on the Internet
categories:
-   Web
tags:
-   wiki
-   sphinx
thumbnail: thumbnail.png
---

I moved all my personal documentation for my home servers from a self-hosted MediaWiki instance to the Internet with GitHub and Read The Docs. Take a look: [http://calvin.rtfd.io/](http://calvin.rtfd.io/).

<!-- more -->

For any computer-based work, it's important to have documentation for it in case you come back later to configure it or rebuild it. Previously, all my personal documentation was stored in a self-hosted instance of [MediaWiki](https://www.mediawiki.org/wiki/MediaWiki), the same software Wikipedia uses.

## The Problem

The issue was that if my server went offline, I couldn't access it to check my documentation. Therefore, I planned to move all my documentation to the Internet.

I wanted to document in markdown and have it generated/built into static HTML files which could be hosted on the Internet. It would be similar to how this blog is built and run using Jekyll and GitHub. This way it could be fast, portable and secure.

![](staticsite.jpg)

## Read the Docs

After looking at [Ikiwiki](https://ikiwiki.info) and [GitBook](https://www.gitbook.com/), I landed on **[Read the Docs](https://readthedocs.org/)**, a website which hosts [Sphinx](http://www.sphinx-doc.org/en/stable/index.html) documentation from GitHub.

The benefit of this was:

* Free hosting on GitHub and Read the Docs
* Accessible from anywhere with Internet
* Automatic build after a push (webhook to GitHub)
* Versioning built-in (new version after each push)

### Sphinx

Read the Docs uses Sphinx, a Python Documentation Generator which outputs HTML. There was a little learning curve as Sphinx uses [reStructuredText](http://docutils.sourceforge.net/rst.html) as its markup language but it was straightforward similar to how Markdown is written.

I was up and running fast and got everything migrated over in a day with running into an issue inserting images (paths had to be absolute).

## Storing Secrets

The next thing to take was **encrypting my secrets** (passwords, licenses, certificates, etc.) in a way that was convenient to decrypt but also not easy hackable.

I decided to use OpenSSL to **encrypt** my secrets:

`echo password | openssl enc -e -aes-256-cbc -a -salt`

`cat privatekey | openssl enc -e -aes-256-cbc -a -salt`

And then to **decrypt** them:

`echo secret | openssl enc -d -aes-256-cbc -a -salt`

`cat filename | openssl enc -d -aes-256-cbc -a -salt`

## Source

You can take a look at my source code here: [https://github.com/calvinbui/documentation](https://github.com/calvinbui/documentation).

You can also take a look at the documentation here: [http://calvin.rtfd.io/](http://calvin.rtfd.io/).
