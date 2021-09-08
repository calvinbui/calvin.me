---
title: Cross-Platform Dotfiles
categories:
- Computers
tags:
- dotbot
- dotfiles
# https://www.iconfinder.com/icons/2559822/dots_media_network_social_icon
thumbnail: thumbnail.svg
---

How I manage configs across different computers and operating systems.

From my [previous post](/managing-dotfiles), I'm still thoroughly enjoying [dotbot](https://github.com/anishathalye/dotbot) for managing my dotfiles and bootstrapping new computers. It is lightweight, has no external dependencies and requires no installation.

My [dotfiles repo](https://github.com/calvinbui/dotfiles) only supported macOS. In my day-to-day, I'm using Windows, Linux and macOS for personal and work purposes. I did a fresh install of Windows on my PC and decided now would be the time to support Windows and Linux as well.

## uname

The `uname` command stands for Unix Name. It's a useful command that outputs details about the current machine like its operating system. I'll be using `uname` extensively to differentiate between my operating systems. It's the special sauce holding everything together.

Wikipedia has a [compatibility list](https://en.wikipedia.org/wiki/Uname) for `uname`. The main operating systems are supported like Android, Debian, Fedora, macOS, Ubuntu and Windows. This will be okay for me as:

- the operating systems are known (Windows, macOS, Ubuntu) and not likely to change
- the computers are known (personal, work, server) and not likely to change

## dotbot

dotbot's config has two main functions: linking files and running scripts. It's possible to split each function for each operating system.


### Links

For symlinks, use the `if` parameter to link different files. In this example, I'm linking a different `.gitlocal` file based on the output of `uname -s`.

```yaml
- link:
    ~/.gitconfig: git/gitconfig

- link:
    ~/.gitlocal:
      path: git/linux
      if: '[ "$(uname -s)" = "Linux" ]'

- link:
    ~/.gitlocal:
      path: git/mac
      if: '[ "$(uname -s)" = "Darwin" ]'
```

It's also possible to use the `defaults` key inbetween each `link` step to not repeat yourself:

```yaml
# link all the Linux stuff
- defaults:
    link:
      if: '[ "$(uname -s)" = "Linux" ]'
- link:
    ~/.gitlocal:  git/linux
    ~/.config/sublime-text-3: subl/linux
    ~/.bashrc: bash/bashrc

# change defaults and link all the Mac stuff
- defaults:
    link:
      if: '[ "$(uname -s)" = "Darwin" ]'
- link:
    ~/.gitlocal:  git/mac
    ~/Library/Application Support/Sublime Text 3: subl/mac
    ~/.zshrc: zsh/zshrc
```

### Scripts

For scripts, a `|` block scalar can be used on the `command` parameter to run a multiline script. Once again, I'm using `uname` to determine the operating system and if the script should execute.

```yaml
- shell:
  - description: apt-get install
    command: |
      if [ "$(uname -s)" = "Linux" ]; then
        sudo apt-get update
        sudo apt-get install -y $(cat apt/packages.txt)
      fi
    stdout: true
    stdin: true
```

## gitconfig

My `gitconfig` file differs between operating systems because of the GPG signing keys, credential store and diff tool. Newer versions of `git` support an [`include` and `includeIf` section](https://git-scm.com/docs/git-config#_includes) to pull in config directives from another source. For example, I'm linking to `.gitlocal` file which is different on each Linux and Mac:

```ini
[user]
	name = Calvin Bui
	email = 3604363+calvinbui@users.noreply.github.com

[include]
	path = .gitlocal
```

Linux specific `gitconfig` options:

```ini
[user]
  signingkey = MyLinuxSigningKey
```

Mac-specific `gitconfig`, which uses a different credential store:

```ini
[user]
  signingkey = MyMacSigningKey

[credential]
	helper = osxkeychain
```

## ZSH

I use ZSH with oh-my-zsh. It has a [custom directory](https://github.com/ohmyzsh/ohmyzsh#custom-directory) which is loads any `.zsh` files when the terminal is initialised. This is the recommended method of adding paths or custom functions instead of appending them onto `~/.zshrc`. Using the `uname` method as before, I can selectively include different paths and functions based on the operating system: 

```bash
# ~/.oh-my-zsh/custom/paths.zsh

if [ "$(uname -s)" = "Darwin" ]; then
  do_mac_stuff() {
    echo "Hi From Mac"
  }

  # homebrew path
  export PATH="/usr/local/sbin:${PATH}"

elif [ "$(uname -s)" = "Linux" ]; then
  do_linux_stuff() {
    echo "Hi from Linux"
  }

  # Python on Linux
  export PATH="${HOME}/.local/bin:${PATH}"
fi
```

## Chocolatey

[Chocolatey](https://chocolatey.org/) is a package manager for Windows. I've used it many years ago and it has gotten a lot better since then for me to recommend it. Chocolately contained almost all of the applications I commonly installed. The only applications I had to install manually were [LAV Filters Megamix](https://www.videohelp.com/software/LAV-Filters-Megamix) and drivers for my printer.

After installing everything, I used [choco-package-list-backup](https://community.chocolatey.org/packages/choco-package-list-backup), a tool by [bcurran3](https://github.com/bcurran3/ChocolateyPackages/tree/master/choco-package-list-backup) to backup the list of currently installed packages including their **installation parameters**. The standard Chocolately backup does not backup **installation parameters** as they can be sensitive. To do this, I set the `<SaveArguments>` value to `true` inside of the XML config:

```xml
<?xml version="1.0"?>
<Settings>
  <Preferences>
    <SaveArguments>true</SaveArguments>
  </Preferences>
</Settings>
```

## Future Plans

- Continually sync changes (but safely to not include secrets) so the repo always remains up to date
- Do more Windows-specific configuration
- Add tests to validate everything works (CI for all OSes?)
