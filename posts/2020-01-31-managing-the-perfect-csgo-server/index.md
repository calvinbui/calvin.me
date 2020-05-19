---
title: Managing the Perfect CS:GO Server
categories:
-   Gaming
tags:
-   csgo
-   autopilot
thumbnail: thumbnail.png
---

Everything learnt from managing the Counter-Strike server at work.

<!-- more -->

## Autopilot

I currently work at [Autopilot](https://autopilothq.com/), and at 12:30 PM each day, we play [Counter-Strike: Global Offensive (CS:GO)](https://store.steampowered.com/app/730/CounterStrike_Global_Offensive/). Players include the CEO, CTO, designers, software engineers and support team members. We run our own [public server](https://www.gametracker.com/server_info/49.255.175.50:27015/) so anyone working remotely, overseas or from home can always join.

I have tried a lot of different settings to increase participation and engagement. This post is to share everything I've learnt about running a game server at work.

## Server

![linuxgsm.png](linuxgsm.png)

[LinuxGSM (Linux Game Server managers)](https://linuxgsm.com/) is the software powering the server. Valve provides [other alternatives on their Developer Wiki](https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive_Dedicated_Servers). Previously, we used [csgosl](https://github.com/lenosisnickerboa/csgosl) which provides a GUI but I found it limited for advanced customisation.

Ansible deploys the server, configuration and plugins. The repository can be found on GitHub: [https://github.com/calvinbui/ansible-csgo](https://github.com/calvinbui/ansible-csgo)

## Settings

**Classic Casual** has been the [best mode](https://counterstrike.fandom.com/wiki/Casual) for us. It allows more than 5 players per team, kill-cams and automatic [Kevlar + Helmet](https://counterstrike.fandom.com/wiki/Kevlar_%2B_Helmet) and  [Defuse Kits](https://counterstrike.fandom.com/wiki/Defuse_Kit) per round. I tried tweaking [Competitive mode](https://counterstrike.fandom.com/wiki/Competitive) to more like Casual but it didn't provide any benefits.

**30 min games** have been preferred over a first to 15. Depending on the map and amount of players, a first to 15 could take almost all of lunchtime. The moment the first player joins the server, the 30 min timer starts counting down.

**Team collision** has been enabled to make things a bit more realistic. **Friendly-fire** has been left disabled, to prevent rage quit moments.

**64 ticks** as 128 ticks was causing a lot of our Mac players to lag. We found some players did slightly better at 128 ticks...

Depending on the number of players, a small or larger map is generally chosen. Older nostalgic maps that Valve has removed such as **de_dust** and **de_aztec** are available using the Steam Workshop.

## Rankings

We ran a competitive ranking ladder using the [RankMe plugin](https://forums.alliedmods.net/showthread.php?p=2467665). The front-end is still accessible at [https://csgo.autopilothq.dev/](https://csgo.autopilothq.dev/) which uses [niekcandaele/CSGO-RankMe-stats](https://github.com/niekcandaele/CSGO-RankMe-stats)

![rankme.png](rankme.png)

It was all fun and games until it wasn't. What I found was:

- Players were focused on individual performances as there weren't set teams
- Players felt the need to use the best guns rather than experimenting
- CT Players would play too safe and let the bomb explode or round timer end
- We began to lose players as a clear gap begin appearing good and bad performers
- The lunchtime _casual_ nature of Counter-Strike became too competitive

With blessing from the CEO, the ranking system was removed and games became fun again.

## Mods

These are the current mods I've set up (also available in the Ansible repo linked before):

- [Quake Sounds](https://forums.alliedmods.net/showthread.php?t=224316) - announcements of headshots, first-bloods and multi-kills.
- [Fortnite Emotes](https://forums.alliedmods.net/showthread.php?p=2668778) - a fun plugin to use once you win a round
- [Weapons & Knives](https://forums.alliedmods.net/showthread.php?t=298770) - the official skins but available for free
- [Gloves](https://forums.alliedmods.net/showthread.php?t=299977) - same as weapons and knives, but gloves
- [Fortnite Damage](https://forums.alliedmods.net/showthread.php?t=309218) - displays damage in real-time

When [Operation Shattered Web](https://counter-strike.net/shatteredweb) release in November, it broke a few of the plugins above so if something's wrong, disable plugins and wait for an update.

![weaponskin.jpg](weaponskin.jpg)

## Slack Bot

I wrote a Slack Application to run commands on the server. It connects to the CS:GO server using the [Source RCON Protocol](https://developer.valvesoftware.com/wiki/Source_RCON_Protocol) to allow console (~) commands to be issued to the server.

![slack-bot.png](slack-bot.png)

This helped players that didn't know the commands off by heart to easily change the current map, restart the game, end warmup times, etc.

I'll be looking to add more functionality to the application such as a daily map voting system and sharing the results of a match after a game.

The code is available on my GitHub: [https://github.com/calvinbui/slack-csgo](https://github.com/calvinbui/slack-csgo)
