---
title: Managing Dotfiles
categories:
- Computers
tags:
- dotbot
- dotfiles
# https://www.iconfinder.com/icons/7324042/ui_interface_more_options_menu_dots_icon
thumbnail: thumbnail.svg
---

How I backup, restore and sync preferences and settings across computers.

<!-- more -->

Recently, I upgraded my Macbook at work but had to spend a few hours setting everything up again from scratch. This meant switching back and forth between both machines when the newer one was missing something I needed.

The weekend came around and I started exploring the different dotfile options available. GitHub has a [curated list of dotfile tools](https://dotfiles.github.io/) I explored and eventually came to an approach I liked.

Things that I already I wanted to do were:

1. Backup to Git
2. Support for Mac and Linux
3. No dependencies e.g. Python-based tool
4. Ability to backup other things like npm, pip, brew

But the biggest thing I had to figure out was it better to copy or symlink the dotfiles...

## Copying files vs Symlinking files

My first approach was 'copying' the files, as in every time there's a backup/restore, the files will be copied from the repository to their destination. There are some downsides to this:

1. The repo is not always up to date
2. Accidental deletion if 'restore' is run instead of 'backup'
3. No constant 'single source of truth'

[Symlinking](https://en.wikipedia.org/wiki/Symbolic_link) on the other hand are like shortcuts/aliases to the original file. The downsides of symlinking on the other hand:

1. Some applications may not like that files are links
2. Moving symlinks may be troublesome i.e. the application does a migration

After trying both solutions, I decided on **symlinks**. The reason: I did the accidental deletion instead of a backup (downside #2)

## Dotbot

After going through the [curated list of dotfile tools](https://dotfiles.github.io/), I landed on [Dotbot](https://github.com/anishathalye/dotbot) by [Anish Athalye](https://github.com/anishathalye).

> Dotbot makes installing your dotfiles as easy as git clone $url && cd dotfiles && ./install, even on a freshly installed system!

Dotbot met all my requirements:

1. Can be backed up to a Git repository. In fact, Dotbot is installed as a gitmodule so it can be easily updated, following the single source of truth philosophy
2. After cloning my repo, I only have to run the [install](https://github.com/calvinbui/dotfiles/blob/master/install) script to set everything up. Everything is managed in a [single file](https://github.com/calvinbui/dotfiles/blob/master/config.yaml)
3. It's a bash script without any other dependencies besides `git` and `bash`
4. Other than symlinking dotfiles, it can also execute commands to trigger other custom scripts.

## Custom scripts

Within the dotbot configuration, a [shell](https://github.com/anishathalye/dotbot/#shell) section can be configured to specify commands to be executed. I use this for:

- Installing [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)
- Installing [brew](https://brew.sh/) and brew/cask packages
- Installing pip modules
- Installing npm packages
- Installing [Vundle](https://github.com/VundleVim/Vundle.vim) and its plugins

But before they can be installed, they need to be backed up. For that, I have written a [backup script](https://github.com/calvinbui/dotfiles/blob/master/backup.sh) that triggers each of the above. It is not ideal but it's the only way this can be done. Set this to a cron schedule and you'll get a somewhat automated backup for them.

- [Create a requirements.txt of pip modules](https://github.com/calvinbui/dotfiles/blob/master/pip/backup.sh)
- [Create a packages.txt of NPM modules](https://github.com/calvinbui/dotfiles/blob/master/npm/backup.sh)
- [Create a Brewfile](https://github.com/calvinbui/dotfiles/blob/master/mac/generate-brewfile.sh)
