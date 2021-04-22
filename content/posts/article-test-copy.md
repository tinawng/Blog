---
title: A petty trick in front of a builtin function
date: 2021-03-22
author: Tina Wang
tags: [akd, laed, fkmeg]
---

Lately, I was working on a project that’ll heavily concentrating on the server-side. Although those server-side stuffs aren’t really my expertise. The lucky part is that this project is about process the HTTP header and return a proper json as response.

After most of my challenges are completed, there’s one last problem for me to solve:

> “How do I get only the domain name and extension name out of a host name?”

For instance, you’ve got some string domains as input:

```
www.google.com
www.google.co.jp
mail.google.com.hk
The expected output should be:
```

After some research, I came to know that there’s a builtin function `gethostbyname` from a native C library `netdb` which can be directly adopted into my program. The function is well explained in the https://www.gnu.org/software/libc/manual/html_node/Host-Names.html.