---
title: Goodbye Root and Xposed
categories:
- Security
- Mobile
tags:
- xposed
- android
# https://www.iconfinder.com/icons/3377025/android_logo_media_social_icon
thumbnail: thumbnail.svg
---

Accept it or not, Google is moving transitioning to a non-root/non-xposed world.

<!-- more -->

Having an Android and being able to tweak it however I want is awesome. It's amazing seeing the unique and interesting enhancements that are made with Xposed modules and apps that run as root. The best thing however personally is getting updates faster than the manufacturer or telco can get them out. For example, Google has been abandoned by Nexus 4 but the community already has it on the latest 7.1 (as of writing).

The problem with rooting or using Xposed is they both fail [Google's SafetyNet checks](https://developer.android.com/training/safetynet/index.html). SafetyNet checks if:

* The phone is rooted
* The bootloader is unlocked
* The `/system` partition is modified (i.e. custom rom)

Many apps that are using SafetyNet (Pokemon Go, Banking, etc.) are blocking users from accessing them. Other areas like banking, financial services, streaming and [Android Pay](https://www.android.com/intl/en_au/pay/) are already using SafetyNet to block _modified_ phones from using them.

As this seems to be the way things are going with Android, I definitely felt it would be best to start finding alternatives to the apps and mods I used.

## XNotifications

[_Xposed Repo Link_](http://repo.xposed.info/module/com.taptigo.xposed.xnotifications)

**Used For**: Quickly marking Gmail messages as read if they're not important (i.e. PayPal message after buying something on eBay).

**Alternative**: Take a look at my post about using a [script to move Archived Emails in Gmail to the Inbox](/gmail-mark-as-read-archive-alternative).

## Titanium Backup

[_Play Store Link_](https://play.google.com/store/apps/details?id=com.keramidas.TitaniumBackup&hl=en)

**Used For**: Making backups of apps and data.

**Alternative**: I haven't found any solution to this yet :pensive:

By default, Google will remember which apps are installed and reinstall them when doing a new setup. The only downside is no app data will be restored.

## Android N Features (Android N-ify)

[_Xposed Repo Link_](http://repo.xposed.info/module/tk.wasdennnoch.androidn_ify)

**Used For**: Getting Android Nougat features like fast switching apps and quick settings.

**Alternative**: Easy, update to Nougat or get a phone that has Nougat.

## Battery - Greenify & Amplify

**Used For**: Saving battery by hibernating apps and preventing wakelocks and services from running when the screen is off.

**Alternative**:
[Greenify](https://play.google.com/store/apps/details?id=com.oasisfeng.greenify&hl=en) still works without root. It doesn't do as good of a job as it just Force Closes apps after the screen turns off it seems.

[Amplify](https://play.google.com/store/apps/details?id=com.ryansteckler.nlpunbounce&hl=en) is not as easy to replace, requiring both root and Xposed installed.

I noticed about a 10%-20% decrease in battery life without both apps installed.

## Adblocking

**Used For**: To block ads I used:

* [Adaway](https://f-droid.org/repository/browse/?fdid=org.adaway): For web browsing.
* [YouTube Adaway](http://repo.xposed.info/module/ma.wanam.youtubeadaway): For YouTube.
* [MinMinGuard](http://repo.xposed.info/module/tw.fatminmin.xposed.minminguard): For ads in apps.

**Alternative**: The solution so far has been to install [AdGuard](https://adguard.com/en/welcome.html). It's not perfect but it does a good job.

* Ads within apps are blocked on a per-app basis
* Ads within the web browser (I use Chrome) are blocked
* Ads within YouTube are blocked if you clear its data on each phone reboot.

## Conclusion

The two things I'd miss the most are battery savings using Greenify and Amplify. All the other mods are easily overcome except for that. Hopefully as Android makes crazier power savings techniques (i.e. Doze) or manufacturers release more efficient CPUs and bigger batteries, nothing will change.
