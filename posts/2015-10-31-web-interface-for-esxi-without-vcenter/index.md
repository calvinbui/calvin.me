---
title: Web Interface for ESXi without vCenter
categories:
-   Virtualisation
tags:
-   esxi
-   vmware
-   web interface
thumbnail: thumbnail.png
---

It's now possible to manage standalone ESXi hosts with not only the Windows vSphere Client or vCenter, but with a web interface for ESXi !

<!-- more -->

[VMware Labs](https://labs.vmware.com/) is where the latest tools (known as Flings) are being released for early feedback. One of these Flings is an embedded web interface for ESXi hosts written in HTML and JavaScript known as the ESXi Embedded Host Client.

Current features include:

* VM operations (Power on, off, reset, suspend, etc).
* Creating a new VM, from scratch or from OVF/OVA (limited OVA support)
* Configuring NTP on a host
* Displaying summaries, events, tasks and notifications/alerts
* Providing a console to VMs
* Configuring host networking
* Configuring host advanced settings
* Configuring host services

There are some issues too at the moment:

* On ESXi hosts which are assigned a VMware vSphere Hypervisor license, all modification operations will fail silently. We are working on a solution to this issue.
* On ESXi hosts which have a sub-domain name with large, shared cookies a web console session may fail to initialize. A workaround is to clear cookies or run the host client in an incognito-type window.
* For ESXi 5.5U2 and prior, and ESXi 6.0 hosts upgraded from any 5.5U2 or prior version, you will get a 503 error returned after visiting `https://<esxhost>/ui/`. To resolve this issue, please remove the line starting with /ui from /etc/vmware/rhttpproxy/endpoints.conf and restart rhttpproxy with /etc/init.d/rhttpproxy restart
* For ESXi 5.5 hosts, in-browser consoles are not supported. Please use VMRC to access guest VM consoles.
* For ESXi 5.5U2 and prior hosts, you must ensure to append a trailing / (forward slash) to the URL after /ui. The URL must be `https://<esxhost>/ui/`
* For some Windows guests, send Ctrl-Alt-Del does not work.

The first issue is a real killer. Only hosts running the evaluation license can perform power operations at the moment. Hopefully the next update fixes this as the evaluation license only lasts 60 days.

## Installation

Everything you need to know can be found on the [official Fling page](https://labs.vmware.com/flings/esxi-embedded-host-client). But to summarise:

### Installing it over the Internet

1. SSH into your ESXi host
2. Run the command

```shell-session
esxcli software vib install -v http://download3.vmware.com/software/vmw-tools/esxui/esxui_signed.vib
```

### Installing it from a local file

1. Download the [VIB file](http://download3.vmware.com/software/vmw-tools/esxui/esxui_signed.vib)
2. SSH into your ESXi host
3. Copy the VIB file to /tmp/
4. Run the command

```shell-session
esxcli software vib install -v /tmp/esxui_signed.vib
```

Making sure you include the full path name to the file or else installation will fail

## Try it out

If the VIB installation completes successfully, you should now be able to navigate a web browser to <https://><esxip>/ui and the login page should be displayed.

![Capture2](Capture2-300x291.png)

Login with your usually ESXi credentials and try it out.

![running](running-300x291.png)

## Verdict

* I find the UI very similar to vCenter but with a few modifications that make it a lot lighter.
* I like how the console can be opened within the current window, in a new window or in VMRC.
* I do not like how clicking on the image of the console automatically opens it in the current window. Options should be provided like above.
* Almost everything I would want, even the advanced features are available. The only issue is not everything is fully working like enabling/disabling SSH

Overall I'd have to say it is very good start to what VMware are aiming for. The web interface for ESXi is very fast and most things that people would want to perform are covered. The installation was simple and accessing it even more so. No lengthy setups or configurations, it just works.
