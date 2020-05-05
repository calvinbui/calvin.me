---
author: Calvin Bui
comments: true
date: 2014-08-27 14:48:30+00:00
layout: post
slug: lemp-stack-on-centos-7-red-hat
title: 'Install LEMP Stack on CentOS 7 (Red Hat 7)'
categories:
- How-To
- Linux
- Web
tags:
- centos
- lemp
- mysql
- nginx
- php
image: /assets/images/2014-08-27-lemp-stack-on-centos-7-red-hat/featured-image.jpg
images: /assets/images/2014-08-27-lemp-stack-on-centos-7-red-hat/
---

A very quick how-to guide on installing NGINX, MySQL and PHP, otherwise known as a LEMP stack on CentOS 7 (and usable on Red Hat 7 as well). _Image from Digital Ocean [link](https://twitter.com/digitalocean/status/496697898248065025)._

<!-- more --> **1. Install MySQL (mariadb)**

```terminal
$ yum install mariadb mariadb-server
$ mariadb restart
$ sudo /usr/bin/mysql_secure_installation
```

**2. Add the NGINX repository** Create the file named /etc/yum.repos.d/nginx.repo with the following contents:

```config  
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/mainline/centos/7/$basearch/
gpgcheck=0
enabled=1
```

**3. Install NGINX**

```terminal
$ yum install nginx
$ service nginx start
$ service nginx status
```

**4. Allow NGINX through the firewall**

```terminal
$ firewall-cmd --set-default-zone=home
$ firewall-cmd --permanent --zone=home --add-service=http
$ firewall-cmd --reload
```

**5. Install PHP**

```console
$ sudo yum install php-fpm php-mysql
```

**6. Autostart MySQL, NGINX and PHP on boot**

```terminal
$ sudo chkconfig --levels 235 mariadb on sudo chkconfig --levels 235 nginx on sudo chkconfig --levels 235 php-fpm on
```

And we are finished! Start configuring your new LEMP stack on CentOS [![nginx-success]({{page.images}}successsss.png)]({{page.images}}successsss.png)
