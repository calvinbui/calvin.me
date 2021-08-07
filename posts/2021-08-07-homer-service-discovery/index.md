---
title: "Homer Service Discovery"
categories:
- Programming
tags:
- homer
- dashboard
- golang
thumbnail: thumbnail.png
---

I wrote a tool to automatically add and remove new services to the popular [Homer dashboard](https://github.com/bastienwirtz/homer). Homer Service Discovery is available over on GitHub at [calvinbui/homer-service-discovery](https://github.com/calvinbui/homer-service-discovery).

<!-- more -->

## The Idea

The initial idea came from my personal experience. Adding, changing or removing a self-hosted service also required updating the Homer dashboard configuration. I wanted to automate this similar to how Traefik would reverse proxy any new containers using its labels.

## About

The application is written in Golang and is free and open-source including the CI and release process on [GitHub Actions](https://github.com/calvinbui/homer-service-discovery/actions).

I made it available in multi-arch (x86_64, ARM64 and ARMv7) so all Homer users can use it. It is available as static binary files on the [GitHub release page](https://github.com/calvinbui/homer-service-discovery/releases) or Docker images on [GitHub's Container registry](https://github.com/calvinbui/homer-service-discovery/pkgs/container/homer-service-discovery) using [goreleaser](https://github.com/goreleaser/goreleaser).

More information, including how to use it, can be found on the [project's README file](https://github.com/calvinbui/homer-service-discovery/blob/master/README.md).

![](repo.png)

## Contributing

The project meets the [recommended community standards](https://opensource.guide/) for open source projects with the following resources:

- [Code of conduct](https://github.com/calvinbui/homer-service-discovery/blob/master/CODE_OF_CONDUCT.md)
- [Contributing](https://github.com/calvinbui/homer-service-discovery/blob/master/CONTRIBUTING.md)
- [License](https://github.com/calvinbui/homer-service-discovery/blob/master/LICENSE)
- [Issue templates](https://github.com/calvinbui/homer-service-discovery/tree/master/.github/ISSUE_TEMPLATE)
- [Pull request template](https://github.com/calvinbui/homer-service-discovery/blob/master/.github/PULL_REQUEST_TEMPLATE.md)

## Final Thoughts

Features I'd like to add over time include:

- Creating new Services
- Restarting/reloading Homer to clear its cache
- Reading Traefik for an item's URL

Once again, the project is available on GitHub at [calvinbui/homer-service-discovery](https://github.com/calvinbui/homer-service-discovery).
