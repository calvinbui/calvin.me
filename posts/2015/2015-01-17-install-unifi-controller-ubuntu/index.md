---
title: How to install the UniFi Controller on Ubuntu
categories:
- Networking
tags:
- guide
- install
- Ubiquiti
- ubuntu
- unifi controller
# https://www.iconfinder.com/icons/294391/install_download_retail_open_software_box_product_business_receive_peanut_shipping_delivery_packing_icon
thumbnail: thumbnail.svg
---

POST UP TO DATE 19/08/2015

Ubiquiti UniFi is properly supported on Ubuntu and Debian, breaking away from being Windows only. Being on Linux also reduces a lot of overhead that Windows typically laid on. The [installation instructions](https://community.ubnt.com/t5/UniFi-Updates-Blog/UniFi-3-2-7-is-released/ba-p/1085473) provided by Ubiquiti aren't the best so here's my take on it.

<!-- more -->

I will be using a freshly installed Ubuntu 14.04.1 LTS. I previously had issues on installing to a dirty Ubuntu image I've been using as a do-it-all template. There is a section below where I was able to work out those issues though if you are also facing them.

## Add the repository and GPG keys

To install the controller you will need to add the Ubiquiti repository to your apt sources list. This one liner does that for you:

```shell-session
echo 'deb http://www.ubnt.com/downloads/unifi/debian stable ubiquiti' | sudo tee -a /etc/apt/sources.list.d/100-ubnt.list
```

Next you will need to add the [GNU Privacy Guard (GPG)](http://en.wikipedia.org/wiki/GNU_Privacy_Guard) keys for UniFi and MongoDB (used to store your users and WiFi statistics within the UniFi controller). The GPG keys verifies the genuinity of who you will be downloading from during the installation. Here's another one liner to add both (Ubiquiti first then MongoDB):

```shell-session
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv C0A52C50 && sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
```

Now perform update to ensure Ubuntu recognises the repository:

```shell-session
sudo apt-get update
```

## Install UniFi

Finally the big moment - installing the UniFi controller.

```shell-session
sudo apt-get install unifi -y
```

It will install a bunch of dependencies with it including Java 6, MongoDB, Tomcat and a Java SSL certificate tool.

As of August, the unifi-beta and unifi-rapid packages are obsolete.

## Access the web interface

If everything went smoothly you should be able to access the controller through your web browser: <https://unifi-server-here:8443>

Depending on the version installed, you will be taken to the setup wizard. You're done!

![Capture](capture2.png)

## Problems

### Determine the problem

A good start would be to go through the system logs and google the issue:

```shell-session
cat /var/log/unifi/server.log
```

### Restart UniFi

Just like any other service in Ubuntu, UniFi can be stop, started and restarted.

```shell-session
# to stop the controller
$ sudo service unifi stop

# to start the controller
$ sudo service unifi start

# to restart the controller
$ sudo service unifi restart

# to view the controller's current status
$ sudo service unifi status
```

### Java Home not found

This issue can be tricky. UniFi cannot access Java to run Tomcat (its web server). To check if you have Java, simply run:

```shell-session
java -version
```

If nothing appears you do not have Java. The latest version of UniFi supports Java 8. To install Java, [follow this guide from Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-manually-install-oracle-java-on-a-debian-or-ubuntu-vps).

If you do have Java (or installed it now), you will have to edit the UniFi startup script to point out the location of Java. Open the startup script:

```shell-session
sudo editor /etc/init.d/unifi
```

Change the 'JAVA_HOME' location to your new Java location:

```shell-session
JAVA_HOME=/opt/jdk/jdk1.8.0_XX
```

### Keystore file missing / java.io.FileNotFoundException

When going through the log file you may find the error:

```shell-session
java.io.FileNotFoundException: /usr/lib/unifi/data/keystore (No such file or directory)
```

This error means that the 'keystore' file is missing, resulting in Tomcat not being able to start up. The keystore file is responsible for encrypting your connection (HTTPS/SSL).

Generate a new keystore file, answering blank to every question including password:

```shell-session
sudo keytool -genkey -keyalg RSA -alias selfsigned -keystore /usr/lib/unifi/data/keystore -storepass aircontrolenterprise -validity 365 -keysize 2048 -destalias unifi
```

Restart UniFi when successful and try accessing the web interface again.

```shell-session
sudo service unifi restart
```
