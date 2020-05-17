---
title: Hacking the Xiaomi Xiaofang Camera
categories:
-   Programming
tags:
-   xiaomi
-   camera
thumbnail: thumbnail.png
---

Hacking a $25 indoor camera to do more than it's worth.

<!-- more -->

The Xiaomi Xiaofang IP camera is a indoor WiFi camera capable of 1080P resolution and decent night-vision. I purchased it to monitor my room and was happily surprised to find the base is magnetic!

For the lowest price (shipped from China), check out the [OzBargain](https://www.ozbargain.com.au/product/xiaomi-xiaofang) page for the product.

## Out-of-the-box Limitations

Xiaomi has imposed a few limitations on this camera out of the box:

1.  Camera footage only viewable through the MiHome app.
2.  If the MiHome app is newer than version 4.0.11, the camera won't be accessible outside of China
3.  Maximum SD card size is 32GB

## Fixing the Limitations

[@samtap](https://github.com/samtap) on GitHub has released a collection of modifications for the camera: [https://github.com/samtap/fang-hacks](https://github.com/samtap/fang-hacks).

There are a million guides on the Internet on how to get these installed so I won't cover it here.

The main modification we'll be using for the camera is the built in RTSP (Real Time Streaming Protocol) server which will allow us to access the video stream from any compatible application. RTSP will be important for connecting it to my [Milestone XProtect Video Management Server](/home-security-cameras).

For my RTSP configuration, I went with 1024 x 576 at 15 fps. While 1080P 60FPS is entertaining, I didn't find it stable enough for my uses. This is configured within `/media/mmcblk0p2/data/etc/scripts/20-rtsp-server`:

```
snx_rtsp_server -W 1024 -H 576 -Q 10 -F 15 -b 1024 -a
```

## Connecting to Milestone XProtect

Once the RTSP stream is up and running at `rtsp://ip-address:554/unicast`, you can to connecting to it with VLC (File > Media > Open Network Stream). Connecting it to Milestone however using the Universal Driver does not work strangely. Others have run into this issue as well on the [Milestone Support Community](https://force.milestonesys.com/support/MccSupportCommunity?id=9060O000000Xb0UQAS). Using Wireshark, I suspect the issue is the Universal Driver attempting to access `/unicast/` and `/unicast/track1` when `/unicast` without the trailing slash is the correct path.

The alternative is to open the stream in VLC and pass it onto Milestone.

![Add the camera](/camera-stream.PNG)

### 1. VLC Passthrough

Save the following as a `.bat` file:

```
C:\..\..\vlc.exe rtsp://ip-address/unicast :sout=#rtp{sdp=rtsp://:8554/} :sout-keep
```

Then run the `.bat` file to start streaming from VLC without any video output to save CPU resources. The stream will be available at `rtsp://localhost:8554`.

### 2. Add VLC passthrough to Milestone

In Milestone, add the VLC stream with the same configuration as below:

```
IP: localhost
Port: 8554
Username: <default>
Password:
Driver: Universal 1 channel driver
```

![Add the camera](/add-camera.PNG)

### 3. Configure camera settings

Configure the camera with the same configuration as below:

```
Video Settings:
Codec: H264
Streaming Mode: RTP (UDP)
Delivery mode: Multipart stream
Keep-alive type: Default
Retrieval mode: Streaming
Connecting URI:
RTSP port: 8554
Include options on PLAY: No

Audio Settings:
Codec: PCM A-law
Streaming Mode: RTP (UDP)
Delivery mode: Multipart stream
Keep-alive type: Default
Connecting URI:
RTSP port: 8554
```

![Camera Settings](/camera-settings.PNG)

### Optional: Autostart VLC

There are two options when it comes to autostarting VLC with Windows.

#### Run .bat file on startup

Use Windows Task Scheduler. **Make sure you have the absolute path to vlc.exe in the `.bat` file.**

![Add the camera](/task-scheduler.PNG)

#### Install as a Windows Service

In my experience, running VLC as a Windows Service was caused Connection Errors with Milestone but your mileage may vary.

```
vlc.exe -I ntservice --ntservice-install --ntservice-extraintf=http --ntservice-name=VLC --ntservice-options="rtsp://ip-address/unicast :sout=#rtp{sdp=rtsp://:8554/} :sout-keep"
```

Then start the service.
