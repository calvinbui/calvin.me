---
title: My Homepage Status Monitoring Application
categories:
-   Programming
tags:
-   home
-   javascript
-   mean
-   monitoring
-   status
thumbnail: thumbnail.png
---

Home is an application I developed last year (Nov-Dec) while learning the MEAN (MongoDB, Express, Angular and NodeJS) stack. It's a homepage status monitor, more or less a glorified bookmark/favourites tool with the ability to scan if ports are open or closed on a host.

<!-- more -->

### Problem

Every application is made to solve a particular problem. There needs to be a reason to make it.

*   There were so many web services and infrastructure at work that not everyone on the team knew which was where and how to access its correct URL.
*   There was a need to create transparency.
*   Infrastructure monitoring tools weren't up to the task
    *   Nagios and its clones: overhead using its agents
    *   StatusPage.io: paid service
    *   vCenter Operations Manager: only works for virtual machines

## Idea

So with the problem in mind, I started prototyping the idea in my head:

*   All these services were in my bookmark bar so it work similar to it
*   It would be difficult to get complete system monitoring e.g. CPU, memory, disk usage. A simple is it up or down was good enough.
*   It has to be configurable and easy to make changes to. This would mean I had to use specific languages and tools to make it work.
*   It had to be good enough for everyone, including myself to use on a daily basis.

## Plan

The plan to build it was based off the ideas I had:

*   Minimal and simple approach. This meant a single page design without any page refreshes for any CRUD operations.
*   Achieving the single page design meant I needed asynchronous background operations (e.g. AJAX).
*   To get asynchronous operations I had to use JavaScript. This was a good chance to finally learn the MEAN stack. The MEAN stack provides the ability to create dynamic web sites using free and open-source solutions.

## Execution

I programmed it over the period of a month using IntelliJ's WebStorm application. There were no reviews of any kind and I presented it as-is to my team. The results were very positive.

## Additional Features

One cheesy feature I threw in was the weather feature. Weather provided by Forecast.io and animated icons from Skycons nicely present the forecast over one week period.

[![weather]({{page.images}}weather.png)]({{page.images}}weather.png)

## Download/Source

You can download it over at GitHub:

[https://github.com/calvinbui/home](https://github.com/calvinbui/home)

## Future

If anyone continues my work there were a few things I really wanted to achieve:

*   Drag and Drop functionality to reorder items and sections
*   Pin notices e.g. power outage @ 5pm
*   Better user experience with animations and better validation
*   Create more than just bookmarks e.g. notes
*   More system monitoring
