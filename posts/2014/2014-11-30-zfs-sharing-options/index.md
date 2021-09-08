---
title: ZFS Sharing over HTTP, FTP and more
categories:
- Storage
tags:
- napp-it
- sharing
- zfs
# https://www.iconfinder.com/icons/2570294/business_company_economic_finance_interprise_transfer_icon
thumbnail: thumbnail.svg
---

napp-it overs a [variety of extensions](http://napp-it.org/extensions/index_en.html) to make use of your ZFS filesystem a lot easier. One of the main things to do with a filesystem is to share it of course! There are extensions that allow ZFS sharing over HTTP, FTP, personal clouds and media servers.

<!-- more -->

## AMP Stack (HTTP)

A common favourite of Apache, MySQL and PHP. This enables ZFS sharing over HTTP, accessible via the browser. To install:

```shell-session
wget -O - www.napp-it.org/amp  | perl
```

Afterwards, settings can be altered under Home >Services > Apache.

To share a filesystem over HTTP, enable it under the Home > ZFS Filesystems under the 'WWW' column.

![apache](apache.png)

By itself, sharing over HTTP is very plain old boring. That is why I use [h5ai](http://larsjung.de/h5ai/) which adds several additional features (the styling alone is good enough) like sorting, breadcrumbs, thumbnails, file previews and filtering.

## ProFTPD (FTP)

ProFTPD Is a FTP server, among the most popular today. Its primary goal is to be as feature rich as possible. It is very easy to install as well:

```shell-session
wget -O - www.napp-it.org/proftpd | perl
```

Similar to Apache, it can be configured under Home > Services > FTP. Sharing on the other hand occurs under Home > ZFS Filesystems underneath the FTP column.

![ftp](ftp.png)

## Private Cloud

There are two options if you want to have your own personal cloud storage - OwnCloud and Pydio (formerly AjaXplorer). They allow multiple users to have their own files and folders, calendar and contacts in one place.

I personally did not find OwnCloud or Pydio useful as I already use and integrate a lot of Google products into my workflow. These programs are also not meant to be sharing your entire ZFS filesystem, they instead live on the napp-it datastore.

Both of these will first require the AMP stack.

OwnCloud

```shell-session
wget -O - www.napp-it.org/owncloud  | perl
```

Pydio

```shell-session
wget -O - www.napp-it.org/pydio | perl
```

## Media Server

Serviio is a media server which allows many different devices to stream from your ZFS filesystem. To install it, make sure you have the AMP stack then run the command:

```shell-session
wget -O - www.napp-it.org/serviio | perl
```

Serviio is accessible at `http://<nappit>/phpserviio/`

With Serviio, I am able to specify which shares I want to be visible over DLNA/UPnP. Device such as my PS3 and Yamaha RX-V475 receiver were easily able to access and play from it!

_Adding the shares_:

![serviio1](serviio1.png)

_Devices that are accessing the shares_:

![serviio2](serviio2.png)

_My Yamaha Receiver connecting to the share (shown through my tablet)_:

![serviio3](serviio3.png)

An alternative to Serviio is Mediatomb, although it hasn't be updated in a long time:

```shell-session
wget -O - www.napp-it.org/mediatomb  | sh
```

MediaTomb settings can be found under Home > Add-Ons > Mediatomb.
