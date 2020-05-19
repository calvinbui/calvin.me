---
title: Connect shares on a as-need basis using autofs
categories:
-   Computers
-   Storage
tags:
-   autofs
-   mount
-   shares
thumbnail: thumbnail.png
---

autofs is a program for automatically mounting directories on an as-needed basis. Auto-mounts are mounted only as they are accessed, and are unmounted after a period of inactivity. Mounting a remote share through fstab remains mounted unless you unmount it. Automounting NFS/Samba shares conserves bandwidth and offers better overall performance compared to static mounts through fstab. Furthermore fstab might cause problems if the remote share becomes unavailable, resulting in stale mounts. For example, the file server you are connecting to might crash or the network might go down.

<!-- more -->

## Install autofs

To start, first install autofs through.

For Ubuntu

```shell-session
sudo apt-get install autofs
```

For Red Hat, Fedora and CentOS

```shell-session
sudo yum install autofs
```

## Select or create a mount point

Create a mount point or choose an existing folder (such as /mnt or /media) to act as the mount point.

A mount point is where you want your shared folder to appear. Generally on Windows based machines, they would create a new drive such as a D drive or Z drive.

To create a mount point, simply create a new folder where you wish your mounts to be e.g. /mymount, /home/calvin/networkmounts, etc.

## Mount point configuration

You will need to define mount points to indicate how to connect to your network shares.

Create a new file in /etc/. I like to name this after my mount point e.g. if I chose /mnt I would name it auto.mnt but if I chose /mymount I would use auto.mymount.

Edit the master autofs configuration file at the bottom

```shell-session
sudo nano /etc/auto.master
```

Add the mountpoint to the bottom

```text
/mnt   /etc/auto.mnt
```

Now create the auto.mnt file

```shell-session
sudo nano /etc/auto.mnt
```

There are several types of mounts and each differs in their configuration.

### SMB

Add the following line to your auto.mnt file

```text
folder   server:/
```

Where 'folder' indicates the folder to be created under /mnt to host your shares. e.g.

```text
qnapfs  192.168.0.2://
```

### NFS

Add the following line to your auto.mnt file

```text
folder -fstype=nfsv4  server:/
```

Where 'folder' indicates the folder to be created under /mnt to host your shares. e.g.

```text
qnapfs -fstype=nfsv4 192.168.0.2://
```

The client needs the same changes to **/etc/default/nfs-common** to connect to an NFSv4 server. In **/etc/default/nfs-common** we set:

```text
NEED_IDMAPD=yes
NEED_GSSD=no # no is default
```

### CIFS

Add the following line to your auto.mnt file.

```text
folder -fstype=cifs,rw,noperm,username=myuser,password=mypass ://example.com/shrname
```

If you are using a domain, specify it like so:

```tex
folder -fstype=cifs,rw,noperm,username=myuser,domain=domain.com,password=mypass ://example.com/shrname
```

## Check your share

Reboot and attempt to access your share.

```shell-session
ls /mnt/folder
cd /mnt/folder
```

If it does not work, you will have to debug it

1. Stop the **autofs** daemon

```shell-session
sudo service autofs stop
```

2. Run **automount** in the foreground with verbose information

```shell-session
sudo automount -f -v
```

3. From another terminal, try to mount your file-systems by changing directories into the mountpoint.
4. Check the output from the first terminal for clues as to why the mount failed or was not attempted.

## Sources

* [http://wiki.centos.org/TipsAndTricks/WindowsShares](http://wiki.centos.org/TipsAndTricks/WindowsShares)
* [https://help.ubuntu.com/community/Autofs](https://help.ubuntu.com/community/Autofs)
