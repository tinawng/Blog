---
slug: instant-chill-music
title: Instant Chill Music ~ yet another Spotify ripoff
description: Coming soon
cover_text: 🎶☕
cover_color: yellow
date: 2021-04-23
author: Tina Wang
tags: [Front End, Static, Nuxt.js]
repo: github.com/tinawng/chill
---

When I first encounted Traf's [Sunday.fm](https://sunday.fm/), I was blown away by the simplicity of the concept. I'm already a big fan of webradios and regularly listen to [Chilled Cow's youtube stream](https://www.youtube.com/watch?v=5qap5aO4i9A).

But I see a better opportunity than just re-streaming already existing webradios.

I want to have my own selection of favorites albums directly streamable from any device instantly. A Spotify-like platform but more focused on background music.

# The Challenges 🏆

Let just put on paper some of the main features I planned for this projet:

- ▶️ Instant playback
- ➰ Never ending flow of music
- 🎨 Super clean and easy to use UI
- ⏭ Use video timecodes for songs traking
- 🚫 No audio file hosting
- 💿 Hand picked album playlist

As I'm still in the *all static website* trend, this project will be generate with **[Nuxt.js](https://nuxtjs.org/)** static mode and served using my trusty **[Yeetify](https://github.com/tinawng/yeetify)** static server 💨.

# Puzzle solving 🧩

I like breaking down big problems into smaller one but it's important to keep all the pieces in mind. Solving one part of a problem *smartly* can snowball *in a good way* for others parts of others problem.

With that in ming, let's start *bottom-up* with the data.

## Album informations

An important aspect is to not host any file *directly*. Instead we're gonna stream all the albums from youtube.

One cool aspect of this approach is that I can use the Youtube API to get the video description. In lot of cases it contains the album track list with their time stamps! We *just* need to parse the description and build the tracklist.

Writing the parser was a long and tedious task 😓 but I managed to have an algorithm that work in most cases. You can check it out on the [Github repo](https://github.com/tinawng/chill/blob/main/plugins/albums-parser.js).

In order to have my precious *✨hand picked✨* albums selection, I just added a JSON file with all the albums' Youtube links like following:

```js
[
  {
    "type": "album",
    "youtube_id": "_tV5LEBDs7w",
    "cover": "https://f4.bcbits.com/img/a0953413770_10.jpg",
    "name": "Cozy Winter"
  },
  ...
]
```

As you can see, the album cover is not hosted as well. It's loaded from one of Bandcamp CDN 😁.

See what I did here ? 4 of the challenges are met 💪

I reduce assets hosting to bare minimum using external hosts and Youtube API, JSONify album set allows me to infinitely choose a random album in my album array.

## UI / UX

UI was grealty and generously inspired by Window Groove music app.

<markdown-img :src="slug + '/windows-groove.jpg'" alt="windows groove" class="w-4/5 mx-auto">