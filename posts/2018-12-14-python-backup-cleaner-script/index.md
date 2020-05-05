---
author: Calvin Bui
comments: true
layout: post
slug: python-backup-cleaner-script
title: Python Backup Cleaner Script
categories:
- Storage
- Virtualisation
image: /assets/images/2018-12-14-python-backup-cleaner-script/featured-image.jpg
images:  /assets/images/2018-12-14-python-backup-cleaner-script/
---

A Python script I've written to clean up old backups, keeping only the newest specified amount.

<!-- more -->

As I covered in a [previous post]({{ site.baseurl }}{% post_url 2016-02-29-comparison-of-free-esxi-vm-backup-softwares %}), I am currently backing up my VMs using XSIBackup. There is an option in XSIBackup to delete folders older than N days. This option `--del-dirs` however is only available in the Pro version.

So I've took it upon myself to script it up, using the available Python 3.5 executable in ESXi and XSIBackups' built-in cron functionality.

{% gist 1954841007c4984769080ec4a12df754 %}

## ESXi Instructions
1. Copy the script to a datastore
2. Edit the xsibackup crontab: `vi xsi-dir/conf/root-crontab`
3. Add in the script with it's required options. `-p` for path, `-r` for regex and `-k` for how many to keep.
  ```
  # This crontab belongs to the root user, thus it starts by root-
  # Add cron jobs to this file in the classic crond Linux way.
  # This is an example of a backup job being run everyday at 2:00 a.m.
  # change according to your needs and run ./xsibackup --update-cron
  # min hour day mon dow command
  # 0 2 * * * "/vmfs/volumes/datastore1/xsi-dir/jobs/001"
  0 4 * * * "/vmfs/volumes/files/Misc/VMs/xsi-dir/jobs/002"
  0 6 * * * /bin/python /vmfs/volumes/files/Misc/VMs/clean_backups.py -p '/vmfs/volumes/files/Misc/VMs/' -r 'backup*' -k 5
  ```
4. Install xsibackup's crontab: `./xsibackup --install-cron`
5. Update xsibackup's crontab: `./xsibackup --update-cron`
6. Double check ESXI's crontab: `cat /var/spool/cron/crontabs/root`
