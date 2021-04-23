---
title: Samba your Pie
cover_text: 💃🥧
cover_color: red
date: 2021-04-23
author: Tina Wang
tags: [Raspberry, Sys. Admin, Unix]
---

Constantly jumping between my home desktop and work laptop, working on the same projects require frequent git push/pull. For every *small edit*, I have to *git everything* to keep my workspaces up to date.

Another tedious task was to developp directly on my RPI. Coding on nano throught a SSH connection is not something I would call a *comfy dev environnement*. 😐

Basically, what I need is just a NAS... wright? 🤔

Yeah! This could do the trick 👍 I could even use it to share movies across my phone and PC 🙌 and to host a database (a *MongoDB* to be more precise 😉  ). Terrific!

> “Why don't you just buy a Synology NAS? You can even put database on this bad boy!”

Ooohhh, come on! Where can I have fun if I buy an all in one box 😋 I mean, a Synlogy NAS despite all its features will always stay less flexible than a RPI. I still need it to run all my sketchy websites 🌟 and other quirky node projects 🧪.

Just keep in head that I'm a Windows user so my options are kinda limited 😅

# Let's dance

A first google search lead me to **Samba**. It's free, both Windows and Unix compatible and it do not seems overly complicated to configure (more on this later 😬).

#### *LETS GOOOO* 🏃‍♀️

```bash
apt install samba
cp /etc/samba/smb.conf /etc/samba/smb.conf.sample
service smbd start
```

Well, that was easy! Install, duplicate default config file (a good habit everyone should have 🙆‍♀️) and run the thing.

# Quick technical aside

Unix and Window file system and permissions *DO NOT* work the same.
Samba take care *'natively'* of the file system aspect but it needs some extra tweaking for permissions.

Power user know how Windows permissions can be a real nightmare sometimes 💥

```bash
[share]
   comment=Siyu Workplace
   path=/home/pi/work/
   browseable=Yes
   writeable=Yes
   only guest=no
   create mask=0777
   directory mask=0777
   public=no
```
