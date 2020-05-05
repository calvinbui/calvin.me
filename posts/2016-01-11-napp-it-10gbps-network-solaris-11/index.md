---
title: Improve 10Gbps Performance on napp-it (Solaris 11)
categories:
- Networking
- Virtualisation
tags:
- 10 gigabit network
- 10gbe
- 10gbps
- 10ge
- '9000'
- jumbo frames
- lso
- mtu
- napp-it
- solaris
- solaris 11
tags:
- 
thumbnail: thumbnail.png
---

While it can be difficult to have a transfer speed of 1.25GB per second (10Gbp/s), it wouldn't hurt to make sure it works well right?

<!-- more -->

After some not-so-great performance from my VMXNET3 adapters on napp-it, I decided to investigate how to improve network performance. Theoretically, I believe it is impossible for me to achieve a network transfer of 1.25GB per second.

## iPerf

All networking testing is done using [iPerf](https://iperf.fr) (specifically iPerf 2 as napp-it comes with it bundled). iPerf mesaures network performance through TCP, UDP and SCTP.

For my tests I used the following systems all running iperf

* Ubuntu 14.10 Desktop
* Ubuntu 14.04.3 Server
* Windows Server 2012 R2
* Solaris 11 (running napp-it) - most importantly

## Enabling Jumbo Frames

First thing to do is enable jumbo frames. Typically, networks set their 'maximum transmission unit' or MTU to 1500 bytes. A jumbo frame on the otherhand can carry up to 9000 bytes of payload.

To enable jumbo frames on Solaris 11, Oracle provides a [very easy guide](https://docs.oracle.com/cd/E19120-01/open.solaris/819-6990/ggtwf/index.html) to this:

**1.** Select the interface to enable jumbo frames on, list it using the command:

```terminal
$ dladm show-phys
LINK      MEDIA    STATE SPEED DUPLEX DEVICE
vmxnet3s0 Ethernet up    10000 full   vmxnet3s0
```

**2.** See the current MTU, replacing vmxnet3s0 with your interface

```terminal
$ dladm show-linkprop -p mtu vmxnet3s0
LINK      PROPERTY PERM VALUE DEFAULT POSSIBLE
vmxnet3s0 mtu      rw   1500  1500    60-9000
```

**3.** Turn off the interface to configure it

```terminal
$ ifconfig vmxnet3s0 unplumb
```

**4.** Set MTU to 9000

```terminal
$ dladm set-linkprop -p mtu=9000 vmxnet3s0
```

**5.** Re-enable the interface

```terminal
$ ifconfig vmxnet3s0 plumb 10.0.0.5/24 up
```

**6.** Check if it has updated

```terminal
$ dladm show-link vmxnet3s0
LINK      CLASS MTU  STATE BRIDGE OVER
vmxnet3s0 phys  9000 up    --     --
```

At this point you can test the Jumbo Frames using a ping to a machine which can accept an MTU of 9000. I did a ping to my Ubuntu Desktop.

```terminal
$ ping -s 10.0.0.16 9000 4

PING 10.0.0.16: 9000 data bytes
9008 bytes from 10.0.0.16: icmp_seq=0. time=0.223 ms
9008 bytes from 10.0.0.16: icmp_seq=1. time=0.228 ms
9008 bytes from 10.0.0.16: icmp_seq=2. time=0.243 ms
9008 bytes from 10.0.0.16: icmp_seq=3. time=0.222 ms

----10.0.0.16 PING Statistics----
4 packets transmitted, 4 packets received, 0% packet loss
round-trip (ms)  min/avg/max/stddev = 0.222/0.229/0.243/0.010
```

## Enable Jumbo Frames everywhere

At this point you'll want to enable Jumbo Frames everywhere, most importantly ESXi vSwitches and even physical switches. Simply do this by changing the MTU to 9000.

Of course this depends on the hardware you are using so I can't help much here.

## Disable LSO

LSO or Large Segment Offload is a technology to reduce CPU while having better network performance through segmentation. Segmentation however is not required if we are using an MTU of 9000 however.

**1.** Run the following command to disable LSO though Solaris

```terminal
$ ndd -set /dev/ip ip_lso_outbound 0
```

**2.** Disable LSO through the VMXNET3 driver. Edit /kernel/drv/vmxnet3s.conf. I changed EnableLSO and MTU near the bottom of the file.

```config
EnableLSO=0,0,0,0,0,0,0,0,0,0;
MTU=9000,9000,9000,9000,9000,9000,9000,9000,9000,9000;
```

## Tuning

Finally tune TCP parameters to accommodate the faster speeds

```terminal
$ ipadm set-prop -p max_buf=4194304 tcp
$ ipadm set-prop -p recv_buf=1048576 tcp
$ ipadm set-prop -p send_buf=1048576 tcp
```

## Test out your new performance

Start iperf 2 as a server on napp-it

```terminal
$ cd /var/web-gui/data/tools/iperf
$ ./iperf -s
```

On another computer, run iperf as a client to connect to napp-it.

Here are the results from my Windows Server 2012 VM. It is quite common to see decreased speeds when running iPerf on Windows. **Only 1.82 gigabits per second.**

```terminal
C:iperf.exe -c 10.0.0.5

------------------------------------------------------------
Client connecting to 10.0.0.5, TCP port 5001
TCP window size: 63.0 KByte (default)
------------------------------------------------------------
[ 3] local 10.0.0.16 port 50879 connected with 10.0.0.5 port 5001
[ ID] Interval Transfer Bandwidth
[ 3] 0.0-10.0 sec 2.12 GBytes 1.82 Gbits/sec
```

Results from Ubuntu Desktop! Amazing! **15.4 gigabits per second!!!**

```terminal
$ iperf -c 10.0.0.5
------------------------------------------------------------
Client connecting to 10.0.0.5, TCP port 5001
TCP window size:  325 KByte (default)
------------------------------------------------------------
[  3] local 10.0.1.29 port 59889 connected with 10.0.0.5 port 5001
[ ID] Interval       Transfer     Bandwidth
[  3]  0.0-10.0 sec  17.9 GBytes  15.4 Gbits/sec
```

From my Windows 10 Desktop. It's going over a gigabit switch that does not support Jumbo Frames. **528 megabits per second.**

```terminal
C:>iperf-2.0.5-3-win32>iperf.exe -c 10.0.0.5
------------------------------------------------------------
Client connecting to 10.0.0.5, TCP port 5001
TCP window size: 63.0 KByte (default)
------------------------------------------------------------
[  3] local 10.0.1.41 port 54698 connected with 10.0.0.5 port 5001
[ ID] Interval       Transfer     Bandwidth
[  3]  0.0-10.0 sec   630 MBytes   528 Mbits/sec
```
