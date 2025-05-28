---
title: Gardening Part 2
categories:
- Home
tags:
- garden
- sprinklers
- automation
# https://icon666.com/icon/sprinkler_ep0ncmqa5525
thumbnail: thumbnail.svg
---

In [Part 1](/gardening-part-1), I was working on improving the state of then lawn. In this post, I will cover the jet water pump, spinklers, indoor plant sensors and fixing bent plants.

<!-- more -->

```toc
# This code block gets replaced with the TOC
```

## Jet Water Pump

[As mentioned previously](/gardening-part-1/#watering), the house came with two 5,000-liter water tanks. It also came with a [Bromic Waterboy 60L Jet Pump](https://www.bromicplumbing.com/product/pumps/jet-pumps/bromic-waterboy-60l-jet-pump-0-75kw/) to provide constant pressure to the tap and toilet cisterns.

It uses the [Waterboy Wizard Controller](https://www.bromicplumbing.com/product/pumps/bromic-waterboytm-wizard-controller/) to automatically changeover to mains water if rainwater ran out.

![](pump/bromic-pump.jpg)

### Controller

The pump only turned on when pressure dropped. However, the pump never stopped pumping even once max pressure was reached and it wasn't adjustable either. I was quoted $400 a replacement and $600 for one with a special UV cover...yeah nah.

I begun looking for cheap replacements and realised I didn't need to replace the entire pump, just the automatic controller. I found one on eBay for $37 known as the MAC02 (White International call it the WHI-SK13BA). The maximum pressure is adjustable and it was a drop-in replacement.

![](pump/replaced.jpg)

### Cover

My wife and I covered the pump and protect it from being damaged using the [Moss Pump Cover](https://www.bunnings.com.au/moss-cream-pump-cover_p4812753) from Bunnings. We picked white cause it would be best at reflecting light and it also had ventilation holes. We had to make cutouts and flaps for all the piping.

![](pump/cover-1.jpg)

![](pump/cover-2.jpg)

![](pump/cover-3.jpg)

![](pump/cover-4.jpg)

## Sprinklers

I bought two [GARDENA AquaZoom M Oscillating Sprinklers](https://www.bunnings.com.au/gardena-aquazoom-m-oscillating-sprinkler_p0260536) to water the backyard lawn. It was the only sprinkler that had independent range and width adjustments. Unfortunately, the S and L models aren't available in Australia.

![](sprinklers/sprinkler.jpg)

![](sprinklers/map.png)

I connected both sprinklers to the tap using:

- [Pope 12mm x 30m hose](https://www.bunnings.com.au/pope-12mm-x-30m-handy-garden-hose_p3110072) I chopped up.

- Holman hose connectors. No longer available at Bunnings.

- [Pope 12mm 3 Way Coupler](https://www.bunnings.com.au/pope-12mm-3-way-coupler_p0046152).

![](sprinklers/cutting-hose.jpg)

![](sprinklers/hose-connector-set.jpg)

![](sprinklers/y-connector.jpg)

<video autoplay loop controls muted width="100%" height="auto">
  <source type="video/webm" src="sprinklers/sprinklers.webm">
  <p>Your browser does not support the video element.</p>
</video>

## Indoor Plant Sensors

In my living areas, I'm growing a monstera, chilli, and dwarf jade. To care for them more effectively, I use the [Home Assistant plant integration by Olen](https://github.com/Olen/homeassistant-plant), to track each plant's vital signs through sensors and compares the data with [Open Plantbook](https://open.plantbook.io/). All this information is displayed on a [handy dashboard](https://github.com/Olen/lovelace-flower-card) that I check every week when it's time to water my plants, helping me keep them healthy and thriving.

![](indoor-plants/dashboard.png)

I am using the Xiaomi MiFlora Plant Monitor (HHCCJCY01) sensors to track soil moisture, temperature, conductivity and illuminance. The devices communicate using Bluetooth Low Energy (BLE) by sending broadcasts that Home Assistant listens to using the [Xiaomi BLE integration](https://www.home-assistant.io/integrations/xiaomi_ble). I am using the [DIY mmWave Presence Detectors](/diy-mmwave-presence-detectors) I built as [BLuetooth proxies](https://www.home-assistant.io/integrations/bluetooth). I bought the sensors from AliExpress in bulk.

![](indoor-plants/sensors.jpg)

![](indoor-plants/sensor-2.jpg)

I can confidently vouch for the accuracy of the data I'm receiving from the integration and Open Plantbook. Thanks to this precise monitoring, my monstera has flourished, growing from a single baby leaf into multiple healthy stalks.

![](indoor-plants/monstera-1.jpeg)

![](indoor-plants/monstera-2.jpeg)

![](indoor-plants/monstera-3.jpeg)

## Fixing Bent Plants

In my front yard, I have two New Zealand Cabbage Trees that were growing crooked.

![](bent/crook.jpg)

To straighten them, I tied the trees gently with [jute twine](https://www.bunnings.com.au/grunt-75m-jute-twine_p4310292) to old PVC pipes I repurposed as stakes. This simple method helped support the trees and encourage them to grow upright.

![](bent/pvc.jpg)

![](bent/tied-1.jpg)

![](bent/tied-2.jpg)

## What about the Front Lawn?

The only patch of lawn at the front of my house is actually the council strip. Since it's public property, I'd never consider running sprinklers over the footpath. Although I still take the time to mow and weed it, the council owns this strip and often digs it up when they need to carry out maintenance or other work.

Because it's right next to shops and public transport, there's a lot of foot traffic passing through. This means dogs and shoes often bring in weeds from other areas, making upkeep a constant challenge.

![](council.jpg)
