---
slug: samba-your-pie
title: Samba your Pie ~ a DIY Synology ?
description: I really need something to centralize all my work in one place. But why buying a all-ready-to-use box when you can make it yourself ?
cover_text: 💃🥧
cover_color: pink
date: 2021-04-23
author: Tina Wang
tags: [Raspberry, Sys. Admin, Unix]
---

Constantly jumping between my home desktop and work laptop, working on the same projects require frequent git push/pull. For every *small edit*, I have to *git everything* to keep my workspaces up to date.

Another tedious task was to developp directly on my RPI. Coding on nano throught a SSH connection is not something I would call a *comfy dev environnement*. 💆‍♀️

Basically, what I need is just a NAS... wright?

Yeah! This could do the trick 👍 I could even use it to share movies across my phone and PC 🙌 and to host a database (a *MongoDB* to be more precise). Terrific!

> “Why don't you just buy a Synology NAS? You can even put database on this bad boy!”

Ooohhh, come on! Where can I have fun if I buy an all in one box 😋 I mean, a Synlogy NAS despite all its features will always stay less flexible than a RPI. I still need it to run all my sketchy websites and other quirky node projects 🧪.

Just keep in head that I'm a Windows user so my options are kinda limited...

# Let's dance

A first google search lead me to ***Samba***. It's free, both Windows and Unix compatible and do not seems overly complicated to configure.

#### *LETS GOOOO* 🏃‍♀️

```bash
apt install samba
cp /etc/samba/smb.conf /etc/samba/smb.conf.sample
service smbd start
```

Well, that was easy! Install, duplicate default config file (a good habit everyone should have 🙆‍♀️) and run the thingy.

# Quick technical aside

Unix and Window file system and permissions *DO NOT* work the same.
Samba take care *'natively'* of the file system aspect but it needs some extra tweaking for permissions.

Power user know how Windows permissions can be a real nightmare sometimes 💥

# The holy config file

After speding a lot of time messing if different config sample found on blog,forum,... I finally come up with a working one 🌟

```bash
[share]
   comment=Workplace
   path=/home/pi/work/
   browseable=Yes
   writeable=Yes
   only guest=no
   create mask=0777
   directory mask=0777
   public=no
```

As we set `public=no`, we need to create a samba user to be able to log in 🔒

```bash
sudo smbpasswd -a pi
```

This command will create a user named `pi` and allow you to set a password for it.

# Windows side

What's great about Samba is that it's natively supported by Windows.
Open the Windows explorer and just write down the server IP address like following `\\192.168.1.101`.
A small window should appear asking you login informations.

This only works for local network. In order to connect from everywhere you need to tweak your router config to forward port `445` to your server.

To connect from any Android phone you can use *CS File Explorer* 😉

And we're done! 🎉
