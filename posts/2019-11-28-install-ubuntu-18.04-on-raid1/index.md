---
title: Install Ubuntu 18.04 on RAID1
categories:
-   Computers
tags:
-   ubuntu
-   raid
# thumbnail: thumbnail.png
---

Create a RAID1 (mirroring) array and install Ubuntu 18.04 onto it.

<!-- more -->

The reason for this post is I haven't been able to find a guide for using `mdadm` in the Ubuntu Live server installer to create a RAID1 partition. Following this, there are also no guides on installing the GRUB bootloader to both GPT partitioned devices afterwards.

# Install Ubuntu with software RAID (mdadm)

For the installation, I'm using the Live server installer for Ubuntu Server 18.04.3. It has less problems running from a USB.

Proceed through the installer until you get to Filesystem setup. At this point, choose the `Manual option`:

[![]({{page.images}}1.png)]({{page.images}}1.png){:target="_blank"}

Delete all partitions on both drives you will be using for RAID1:

[![]({{page.images}}2.png)]({{page.images}}2.png){:target="_blank"}

Select a device and choose to `Make Boot Device`.

[![]({{page.images}}3.png)]({{page.images}}3.png){:target="_blank"}

A Boot partition will appear

[![]({{page.images}}4.png)]({{page.images}}4.png){:target="_blank"}

Select the same device as before and choose to `Add Partition`:

[![]({{page.images}}5.png)]({{page.images}}5.png){:target="_blank"}

Enter the size you wish to use and leave the drive **unformatted**. I chose to use the entire drive. **Make note of the size**:

[![]({{page.images}}6.png)]({{page.images}}6.png){:target="_blank"}

Select the secondary device and choose to `Add Partition`:

[![]({{page.images}}7.png)]({{page.images}}7.png){:target="_blank"}

Enter the same size you used for the **first device** and also leave this drive **unformatted**.

[![]({{page.images}}8.png)]({{page.images}}8.png){:target="_blank"}

Select the `[ Create software RAID (md) ]` option

[![]({{page.images}}9.png)]({{page.images}}9.png){:target="_blank"}

Select RAID1 and then both partitions you have created using the `<SPACEBAR>` and choose `[ Create ]` when finished:

[![]({{page.images}}10.png)]({{page.images}}10.png){:target="_blank"}

Select the new RAID device `md0` and choose to the `Format` option:

[![]({{page.images}}11.png)]({{page.images}}11.png){:target="_blank"}

Set the format as `ext4` and choose to mount it at `/`:

[![]({{page.images}}12.png)]({{page.images}}12.png){:target="_blank"}

Select `[ Done ]` at the bottom to continue the installation:

[![]({{page.images}}13.png)]({{page.images}}13.png){:target="_blank"}

If you run into any errors, the Live server installer will fail to 'probe devices' during a reinstall. To fix this, follow [this guide from DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-create-raid-arrays-with-mdadm-on-ubuntu-18-04#resetting-existing-raid-devices) for resetting existing RAID devices.

# Create a Boot Partition on the secondary device

Run `lsblk` to see the partitions you have:

```shell
$ lsblk
NAME    MAJ:MIN RM   SIZE RO TYPE  MOUNTPOINT
sda       8:0    0   477G  0 disk
├─sda1    8:1    0   477G  0 part
│ └─md0   9:0    0 476.8G  0 raid1 /
└─sda2    8:2    0     1M  0 part
sdb       8:16   0   477G  0 disk
└─sdb1    8:17   0   477G  0 part
  └─md0   9:0    0 476.8G  0 raid1 /
```

You can see that the secondary device (`sdb`) does not have a `1M` partition as we did not create a Boot Device on it. Running `parted` or `fdisk` can also confirm this. Here is the `parted` output:

```shell
$ parted /dev/sda print
...
Number  Start   End    Size    File system  Name                 Flags
 1      1049kB  512GB  512GB
 2      512GB   512GB  1049kB               BIOS boot partition  bios_grub

$ parted /dev/sdb print
...
Number  Start   End    Size    File system  Name  Flags
 1      1049kB  512GB  512GB
```

And here is the `fdisk` output:

```shell
$ fdisk -l /dev/sda
...
Device          Start        End    Sectors  Size Type
/dev/sda1        2048 1000210431 1000208384  477G Linux filesystem
/dev/sda2  1000210432 1000212479       2048    1M BIOS boot

$ fdisk -l /dev/sdb
...
Device          Start        End    Sectors  Size Type
/dev/sdb1        2048 1000212479 1000210432  477G Linux filesystem
```


The tool we will use this fix this is [`gdisk`](https://linux.die.net/man/8/gdisk), short for **GPT fdisk**.

Run `gdisk` on the primary device to see the partition table:

```shell
$ gdisk -l /dev/sda
...
Number  Start (sector)    End (sector)  Size       Code  Name
   1            2048      1000210431   476.9 GiB   8300
   2      1000210432      1000212479   1024.0 KiB  EF02
```

This tells us two important details we will need to create the same partition on the secondary device:
- The GRUB partition size is `1024.0 KiB`
- The GRUB partition is of type `EF02`

Run `gdisk` on the secondary device:

```shell
$ gdisk /dev/sdb
```

Enter the following to create a new partition:

```shell
Command (? for help): n
Partition number (2-128, default 2): 2
First sector (34-1000215182, default = 1000212480) or {+-}size{KMGTP}:
Last sector (1000212480-1000215182, default = 1000215182) or {+-}size{KMGTP}: +1024K
Current type is 'Linux filesystem'
Hex code or GUID (L to show codes, Enter = 8300): EF02
```

This creates the boot partition:
- sets the partition table to `2`
- sets the start sector to be end of the partition table `1` (empty = default)
- sets the last sector to be `1024 KiB` from the start sector (as we found out before)
- sets the GUID to `EF02` which is short-hand for a BIOS Boot Partition

Finally enter `w` and accept the changes to create the partition table using `gdisk`:

```shell
Command (? for help): w

Final checks complete. About to write GPT data. THIS WILL OVERWRITE EXISTING
PARTITIONS!!

Do you want to proceed? (Y/N): Y
OK; writing new GUID partition table (GPT) to /dev/sdb.
Warning: The kernel is still using the old partition table.
The new table will be used at the next reboot or after you
run partprobe(8) or kpartx(8)
The operation has completed successfully.
```

As noted by `gdisk`, you have to run `partprobe` or `kpartx` to let the kernel use the new partition tables:

```shell
$ partprobe
```

# Install GRUB to the secondary device

Now that the partition is created, run `grub-install` to install GRUB to the secondary device:

```shell
grub-install /dev/sdb
Installing for i386-pc platform.
Installation finished. No error reported.
```

Reboot and attempt to boot both the primary and secondary devices!
