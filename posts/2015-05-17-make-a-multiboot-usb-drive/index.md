---
title: Make A Multiboot USB Drive
categories:
-   Computers
tags:
-   multiboot
-   system admin
-   tool
-   usb
# thumbnail: thumbnail.png
---

For my job and as a system admin, I'm expected to provide quick fixes and know the solution to every single problem that my users face. That is why I need a tool that just works wherever I bring it and that tool is my USB drive. It can rescue systems from death, scan for viruses, partition drives, install Linux or Windows but best of all it's on a light and speedy portable SSD!

<!-- more -->

## Step 1: USB SSD - Samsung T1 250GB SSD

For my USB I wanted something fast. What's would be better than a portable SSD? I googled around and found Samsung had just released their [T1 SSD](http://www.amazon.com/gp/product/B00RWXV8FE/ref=as_li_tl?ie=UTF8&camp=211189&creative=373489&creativeASIN=B00RWXV8FE&link_code=as3&tag=calbui-20&linkId=WEBJO6UAFPDJQW4N) which is basically their EVO drive in a different form factor. As they weren't released yet in Australia, I nabbed it over on Amazon for $200 and it came in under two weeks.

The drive boasts some ridiculous speeds. I only went with the 250GB as I don't feel I would use that much space. I'm sure the 500GB and 1TB drives are faster than the 250GB due to the higher amounts of flash chips on them. Overall though very happy with the speeds as well as how light and small it is.

![samsungt1]({{page.images}}samsungt1.png)

For a multiboot USB drive it's possible to use any. It doesn't have to be a bleeding edge portable SSD like mine. This could be easily done with a 8GB drive if you don't put too much on it of course.

## Step 2: Get LiveCDs and Software

### Live CDs

I'm just going to do a dump of all the live CDs I will have on this USB. Some are self-explanatory, others not so much. If you're interested in any, a Google search will tell you everything you need to know. E2B have a [list of tested ISO files](http://www.easy2boot.com/add-payload-files/list-of-tested-payload-files/) that are known to work. It can also give ideas of what to download.

*   Antivirus - Acronis Antimalware, Antivirus Live CD, Anvi Rescue, Avira Rescue System, AOSS, AVG Rescue CD, BitDefender Rescue CD, Comodo Rescue Disk, DE Cleaner, Dr. Web Live CD, ESET SysRescue, F-Secure Live CD, G DATA BootCD, INSERT, Kaspersky Rescue CD, VBA32 Rescue, Ubuntu MRT, Zilya
*   All-in-one Boot CDs - Falcon 4 Ultimate Boot CD, Hiren's BootCD, Ultimate Boot CD, Trinity Rescue Kit, System Rescue CD
*   Backup/Cloning - AOMEI Backupper, Clonezilla, EaseUS Disk Copy, Redo Backup, PartImg Is Not Ghost
*   Disk Utilities - DBAN, GParted, Parted Magic, Partition Wizard
*   Tools - Boot Repair Disk, MemTest86+, Open Diagnostics, Ophcrack, NT Password, ufsxbootcd, RIPLinuX, Rescatux

### Software

*   Browsers - Chrome and Firefox for both PC and Mac
*   Work-related software - Education fonts, SMART Notebook
*   iPad Firmware
*   Java offline installers (X86, X64)
*   Mac OS X Yosemite update
*   Wireshark
*   MS Office 2010 and 2013

## Step 3: Picking a Multiboot Software

There were three popular programs available for multibooting, [YUMI](http://www.pendrivelinux.com/yumi-multiboot-usb-creator/), [SARDU](http://www.sarducd.it/) and [Easy2Boot](http://www.easy2boot.com/) (E2B). [Wikipedia has a nice page](http://en.wikipedia.org/wiki/List_of_tools_to_create_Live_USB_systems) with tables on support for operating systems. My perfect multiboot software needed the following capabilities:

*   Windows installation - I'll be using it to install W7/8 from time to time.
*   exFAT support or ability to create multiple partitions - It's going to be a storage drive as well, >4GB file support is required
*   UEFI capability - the ability to install Windows 8 in UEFI mode. UEFI boot not required (no use for it anyway)

So I gave all three programs a try and found that:

*   YUMI
    *   had errors when formatting the drive to exFAT instead of FAT32.
    *   doesn't support Windows
    *   doesn't support UEFI
*   SARDU
    *   only one Windows installer in free version, pro version is unlimited (doesn't exist yet)
    *   couldn't find the Samsung T1 under Windows 8.1, but could in Windows 7
    *   doesn't update USB with changes, instead copies very single file over again
*   E2B
    *   UEFI boot + installing under Windows under UEFI
    *   exFAT, NTFS and FAT32 support
    *   Very manual and requires a little experience and knowledge to get things done
    *   Multi-partition available

Easy2Boot was the obvious choice for me simply for its list of features. There was chock-a-block full of documentation on their website which really helps out when dealing with making and transferring files. It relies a lot on command prompt and there is no real user interface to use. It is definitely not for beginners and will definitely require some experience with similar programs. The way it install Windows 8 as UEFI for example can be complicated for first timers.

## Step 4: Pick a file-system and size

Things to note straight away (from my experience):

*   Allocate enough free space, and then some
*   Choose FAT32 if you want compatibility and/or directly UEFI boot (not the same as installing Windows in UEFI).
*   Choose NTFS if you want to install Windows/Linux images greater than 4GB (due to FAT32 restriction)

For my USB I went with two partitions. One for the multiboot partition (50GB and had 8GB left over by the end) and the rest was allocated as a general USB drive. I chose to go with FAT32 for the multiboot partition for compatibility reasons and exFAT for my general storage. I found NTFS to have issues with some laptops I owned.

[![hiren]({{page.images}}hiren.png)]({{page.images}}hiren.png)

## Step 5: Make the USB Drive

Note: From this point on, this post is specific to how I went about preparing my USB drive for Easy2Boot.

As Easy2Boot has really great documentation, I will refer to the guides I followed:

1.  [Prepare the USB Drive](http://www.easy2boot.com/make-an-easy2boot-usb-drive/make-and-e2b-usb-drive-using-rmprepusb/)
2.  [Make some menus](http://www.easy2boot.com/configuring-e2b/add-a-new-menu-folder/)
3.  [Transfer the ISOs](http://www.easy2boot.com/add-payload-files/)

## Step 6: Windows ISOs

### Reducing and compressing ISOs

Unlucky for me, my Window ISOs were >4GB meaning they couldn't be transferred to the FAT32 partition. But wait, there's a solution!

I used a combination of [NTLite](https://www.ntlite.com/) and [WinReducer](http://www.winreducer.net/), programs that shrink your Windows 7, 8(.1) and 10 installations by allowing you to remove unnecessary drivers, features, apps and compress the install.wim file to an install.esd file.

I was able to reduce a 4.5GB Windows 7 ISO to 3.7GB without compression. My Windows 8.1 ISO was reduced and compressed from 5.3GB to just 2.9GB!

### .imgPTN files

If installing Windows under UEFI, Easy2Boot requires the ISOs to be reformatted to .imgPTN. These files make E2B remove the USB's partition and fake it as a complete Windows disc. It's scary but it can also restore it as it only deletes the partition table and not the data itself. This is [documented in great detail](http://www.easy2boot.com/add-payload-files/makepartimage/) by E2B.

## Final Step: Use It!

To make it a little cooler, you can also edit the background and menu colours...

[![Capture]({{page.images}}Capture-1024x795.png)]({{page.images}}capture.png)
