---
title: Backup VMs! Comparison of Free Backup Software
categories:
- Storage
- Virtualisation
tags:
- backup
- software
- vmware esxi
tags:
- 
thumbnail: thumbnail.png
---

I searched and compared the offerings to backup VMs on the Internet so you don't have to.

<!-- more -->

As they say, you don't need a backup until you need a backup. For me, I have to backup two VMs (Domain Controller & pfSense) that are not stored on my ZFS pools in case of a drive failure. They are currently running off 120GB Intel 520 SSDs that are local datastores in ESXi. The reason for this is that napp-it (my ZFS software) has trouble when it cannot connect to its domain controller or establish a proper network connection. Therefore both of these need to power on before napp-it and thus why they cannot be stored on a ZFS pool (as I am running an All-In-One configuration).

From my search I found 7 reputable free products that can be used to backup VMs in ESXi. They are:

* [Veeam Backup Free Edition v9](https://www.veeam.com/virtual-machine-backup-solution-free.html)
* [Nakivo Backup & Replication v5.8](http://www.nakivo.com/en/NAKIVO-Backup-and-Replication-Free-Edition.html)
* [UniTrends Free v1.05](http://www.unitrends.com/)
* [VSquare v1.4.6](http://www.vsquarebackup.com/)
* [ThinWare vBackup Standard v4.0.1](http://www.thinware.net/Default.aspx)
* [ghettoVCB](https://github.com/lamw/ghettoVCB)
* [XSIBackup](http://sourceforge.net/projects/xsibackup/)

## The Comparison

| PRODUCT | OS | RAM | VMs | INCREMENTAL BACKUP | REMOTE STORAGE | NOTIFICATIONS | SCHEDULING | OTHER |
|-
| Veeam | Windows | 4GB | Unlimited | No | Windows File Explorer to choose | No | No |  |
| Nakivo | Windows, Linux, OVA | 4GB | 2 | Yes | CIFS | Email with PDF reports | Yes | NFR License is unlimited VMs |
| UniTrends | Windows, OVA | 4GB | Unlimited | Yes | No | Email | Yes |  |
| VSquare | Windows | Not stated. My tests show 2GB is enough | Unlimited | Yes | Windows Drive Mapping | Email with PDF reports | Yes | Gmail TLS is not working at the moment. |
| ThinWare | Windows | Not stated. | Unlimited | No | Windows File Explorer to choose | Email | With Windows Task Scheduler | Free license requires a request to be made |
| ghettoVCB | ESXi | N/A | Unlimited | No | Depends on what you can mount into ESXi | Email | With Crontab | Simple solution that can be built into ESXi |
| XSIBackup | Linux | N/A | Unlimited | Yes (rsync) | Depends on what you can mount | Email | With Cron | Script with no GUI |
{: .table }

## Conclusion

* From my tests I can chose VSquare over the other products as it had ticked almost all my boxes. The Administration Console did crash on me a few times I would admit. I would have preferred if it ran on Linux as well.
* If not the limit of 2 VMs on Nakivo I would have gone with instead but I'm trying to look to the future where this could hold me back.
* I don't understand why some programs did not have the ability to manually schedule backup tasks, to me that would be the most important feature to have.
* ghettoVCB and XSIBackup are just scripts which perform copy pasta. They do work though so don't doubt them if you are in need of some RAM or something smaller
