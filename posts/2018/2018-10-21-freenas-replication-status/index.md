---
title: FreeNAS Replication Task Status
categories:
- Storage
- Programming
tags:
- freenas
# https://www.iconfinder.com/icons/6725434/copy_document_extension_file_file_format_file_type_format_icon
thumbnail: thumbnail.svg
---

See the current status of a replication job in the FreeNAS shell.

<!-- more -->

I wrote this script to get the details about a FreeNAS Replication Task. It needs to be executed on the **source** FreeNAS host. It will refresh itself every 5 seconds.

The output:

```shell
$ python rpl.py

Snapshot    : hdd@auto-20181020.1728-2w
Transferred : 3245.6 GB of 10354.96 GB
Remaining   : 7109.36 GB
Percent     : [----->              ] 31%
Speed       : 45.58 MB/s
Started     : Saturday, 20 Oct 18 at 07:08AM
Elapsed     : 0 days, 19 hours, 55 minutes, 55 seconds
Remaining   : 1 days, 20 hours, 21 minutes, 47 seconds
Total       : 2 days, 16 hours, 17 minutes, 43 seconds
End         : Monday, 22 Oct 18 at 11:26PM

Refreshing in 3
```

It currently only supports one replication job. I don't plan to make it support >1 as I'll probably never run more than one.

[Find the code on GitHub Gist](https://gist.github.com/calvinbui/913bb4726334e1461c0616cc3248aa9d).
