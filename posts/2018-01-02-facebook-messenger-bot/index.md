---
title: Facebook Messenger Bot
categories:
- Programming
- Web
tags:
- 
thumbnail: thumbnail.png
---

My shameless Facebook Messenger bot that sends YouTube videos and GIFs if a message received matches a [TWICE](https://twitter.com/JYPETWICE) song.

<!-- more -->

Twice have a lot of (amazing) songs for a girl group that's only debuted 2 years ago. I wanted to promote them to friends in our group chat whenever possible, however possible. We occasionally talk about Table Tennis (TT for short) and also occasionally do 'Knock Knock' jokes on one another. So guess what...Twice have a song called [TT](https://www.youtube.com/watch?v=ePpPVE-GGJw) and another titled [Knock Knock](https://www.youtube.com/watch?v=8A2t_tAjMz8).

<div class="iframe iframe-16x9"><iframe src="https://www.youtube.com/embed/8A2t_tAjMz8" allowfullscreen></iframe></div>

You can find the bot on my GitHub here - [https://github.com/calvinbui/twice-bot-fbmessenger](https://github.com/calvinbui/twice-bot-fbmessenger). The bot is written in Node.js and is already setup to run inside a Docker container. All the instructions are provided in the README.md file.

Whenever a message is received, the bot will examine a message for a regular-expression match defined in the `database.json` file. When a match is found, it will send at random, a link to a video or GIF associated with that song. It will also (shamelessly) give the message that triggered it a heart-eyes reaction :heart_eyes:
