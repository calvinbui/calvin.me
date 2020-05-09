---
title: Delidding My 7700K and Results
categories:
-   Computers
tags:
-   delid
-   intel
# thumbnail: thumbnail.png
---

I dropped my Intel i7 7700K a total of 15 degrees at load and 6 degrees at idle. You can stop reading if you that's all you wanted to know :yum:

<!-- more -->

I did this through a process called delidding. [EK Water Blocks has a great explanation on it if you want to take a read](https://www.ekwb.com/blog/what-is-delidding/).

I performed the delidding using a [3D printed tool](https://www.youmagine.com/designs/intel-kaby-lake-delid-tool) made to fit Kaby Lake CPUs into a vice clamp and opened through sheer force. I also printed a [relidding tool](https://www.youmagine.com/designs/intel-sky-kaby-lake-relid-tool) to put the CPU back together perfectly.

Using the delidding tool was very easy. It wasn't perfect so I had to file it down in a few places to get everything fitting nicely together.

![Delid tool](delidtool.jpg)

I got into a vice I got a while back from Aldi. It was a pretty bad vice and at some points wouldn't go any further. I had to hit it handle with a mallet to get it to rotate a few more times to tighten the clamp and eventually get it to pop open.

![Vice](viceclamp.jpg)

Here's a video of it opening it up the first time.

<iframe src="https://www.youtube.com/embed/dawBGFiRbDY" allowfullscreen width="1280" height="720"></iframe>

![](opened.jpg)

The first thing to do was to scrape off and clean both the IHS and CPU die. I used some acetone, toilet paper and an old membership card to get them both nice and clean for the Thermal Grizzly Conductonaut liquid metal and some gasket maker to seal it together. I applied a minuscule amount of liquid metal and spread it as evenly as possible, making sure to reach all four corners. I also applied a bit of liquid metal on the IHS.

![](thermalgrizzly.jpg)

![](liquidmetal.jpg)

![](reliding.jpg)

To relid the CPU I began by applying the gasket maker around the edges of the IHS while it was inside the relidding tool. I made sure to not use too much like before and have a thin layer all around with a tiny gap as I've seen recommended and what Intel actually do. The relidding tool was easy to use, I simply placed the CPU die onto the IHS when I was ready, placed the cover over the top and slid the clamp over it. I left it to sit for 24 hours for the gasker maker to cure.

![](relid1.jpg)

![](relid2.jpg)

![](relid3.jpg)

After 24 hours, I removed the CPU from the relidding tool and placed it straight back into the motherboard for testing. Here are the results using the Noctua NH L9i

![](results.jpg)

Overall, not a bad result for some work. I'm going to be using a small form factor case (Dan A4) so my CPU cooler options are very limited. Any reduction in temperatures would definitely help where possible as Noctua does not recommend running the 7700K with its NH L9i.

Finally, here are the failed prints:

![Failed prints](failedprints.jpg)
