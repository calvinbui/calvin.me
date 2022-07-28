---
title: Kubernetes Replica Count Manager
categories:
- Programming
tags:
- kubernetes
- grpc
- mtls
- golang
# https://www.reshot.com/free-svg-icons/item/helm-8T6N9KVFYM/
thumbnail: thumbnail.svg
---

This tool provides an API alongside the native Kubernetes deployment controller to manage the pod replica count of deployment resources.

<!-- more -->

You can find this on my GitHub at https://github.com/calvinbui/k8s-replica-count-manager.

From developing this application, I learnt:
- [gRPC](https://grpc.io/)
- [Protobuf](https://developers.google.com/protocol-buffers/)
- how to implement a mutual TLS (mTLS) server
- how to write unit tests against the [Fake Kubernetes client](https://pkg.go.dev/k8s.io/client-go/kubernetes/fake)

This application is based off the [Level 5 challenge from Gravitational/Teleport](https://github.com/gravitational/careers/blob/a78b45b4ddd5a513e66a437648b6d8600bb59cfd/challenges/cloud/sre.md)

## Features

- `List`, `Set` and `Get` desired replica counts across all namespaces
- Automatically scale Deployments to the stored replica count value
- Provides a single source of truth for replica counts of all resources
  - Deployments and upgrades may reset the replica counts back to a previous number
  - Replica counts may be modified by external actors
- Docker image
- Helm chart
- Served over gRPC
- Supports mTLS
- GitHub Actions workflow
