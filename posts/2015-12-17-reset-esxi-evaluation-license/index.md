---
title: Reset ESXi 6 Evaluation License (cron script included)
categories:
-   Virtualisation
tags:
-   cron
-   esxi
-   evaluation
-   license
-   reset
-   script
thumbnail: thumbnail.png
---

*For testing and educational purposes only*

<!-- more -->

The ESXi 6 evaluation license is valid for 60 days and a free one can be obtained from VMware at anytime. Resetting the evaluation license provides continual access to all the features available, and most importantly for me, full compatibility with the [ESXi Embedded Host Client](https://calvin.me/web-interface-for-esxi-without-vcenter/).

## Commands

Note: Running these commands will cause ESXi to appear offline/down. For example, my UPS virtual machine connected to my actual UPS began shutting down VMs because it believed ESXi ran into a problem. Shut down those VMs firstly before running this command then bring them back up later.

Turn on SSH and log in to the host.

Remove the current license

```shell-session
$ rm -r /etc/vmware/license.cfg
```

Copy over the new evaluation license, which is already on the host

```shell-session
$ cp /etc/vmware/.#license.cfg /etc/vmware/license.cfg
```

Restart ESXi services

```shell-session
$ /etc/init.d/vpxa restart
```

Confirm the new license

## Automatic Script

The commands above can be run automatic to keep your ESXi license reset on a set schedule using cron.

I have also created a script which powers off and on a VM of your choice (such as a UPS agent) in case it shuts down the host.

First create the script (reset-eval.sh) somewhere accessible to ESXi. I chose to put in my ZFS0 datastore (/vmfs/volumes/ZFS0/reset.eval)

```shell
#!/bin/sh
## remove license
echo 'Removing License'
rm -r /etc/vmware/license.cfg
## get a new trial license
echo 'Copying new license'
cp /etc/vmware/.#license.cfg /etc/vmware/license.cfg
## restart services
echo 'Restarting VPXA'
/etc/init.d/vpxa restart
```

This alternative script shuts down any VM called 'ups-agent'. You may edit that line to your VM's name

```shell
#!/bin/sh

# This script shuts down the UPS-Agent and resets the license
echo 'Getting VMID of UPS-Agent'
vmid=$(vim-cmd vmsvc/getallvms | grep ups-agent | awk '{print $1}')
echo 'VMID is' $vmid

echo 'Getting UPS-Agent Power state'
state=$(vim-cmd vmsvc/power.getstate $vmid | grep Powered)
echo 'VM is currently' $state
x=1

while [[ "$state" == "Powered on" && $x -lt 3 ]]
do
        echo 'Powering off...'
        vim-cmd vmsvc/power.shutdown "$vmid"
        echo 'Waiting for VM to power off...'
        i=30;while [ $i -gt 0 ];do if [ $i -gt 9 ];then printf "bb$i";else  printf "bb $i";fi;sleep 1;i=`expr $i - 1`;done
        state=$(vim-cmd vmsvc/power.getstate $vmid | grep Powered)
        x=`expr $x + 1`
done

if [ "$state" == "Powered off" ]
        then
        ## remove license
        echo 'Removing License'
        rm -r /etc/vmware/license.cfg
        ## get a new trial license
        echo 'Copying new license'
        cp /etc/vmware/.#license.cfg /etc/vmware/license.cfg
        ## restart services
        echo 'Restarting VPXA'
        /etc/init.d/vpxa restart
        #echo 'Restarting Services'
        #services.sh restart
        ## power on
        echo 'Powering on USP-Agent'
        vim-cmd vmsvc/power.on "$vmid"
else
        echo 'Could not turn off UPS-Agent'
fi

echo 'Finished'
```

Test the script and make sure it works (remember to chmod +x)

```shell-session
$ chmod +x reset-eval.sh
./reset-eval.sh
```

Add the script to the crontab to make it run on a set schedule (mine is set at 6:05am each day). For each 59 days do `* * 59 * *`

```shell
/bin/echo "5 6 * * * /vmfs/volumes/ZFS0/reset-eval.sh" >> /var/spool/cron/crontabs/root
kill $(cat /var/run/crond.pid)
crond
```

Finally add the following to the end of '/etc/rc.local.d/local.sh' to regenerate the job as ESXi clears the crontab on reboot

```shell-session
$ /bin/kill $(cat /var/run/crond.pid)
$ /bin/echo "5 6 * * * /vmfs/volumes/ZFS0/reset-eval.sh" >> /var/spool/cron/crontabs/root
$ crond
```
