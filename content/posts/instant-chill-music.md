---
slug: instant-chill-music
title: Instant Chill Music ~ yet another Spotify ripoff
description: When I first encountered Traf's Sunday.fm, I was blown away by the simplicity of the concept. But I see a better opportunity than just re-streaming already existing webradios.
cover_text: 🎶☕
cover_color: yellow
date: 2021-04-23
author: Tina Wang
tags: [Front End, Static, Nuxt.js]
live: chill.tina.cafe
repo: github.com/tinawng/chill
---

When I first encountered Traf's [Sunday.fm](https://sunday.fm/), I was blown away by the simplicity of the concept. I'm already a big fan of webradios and regularly listen to [Chilled Cow's youtube stream](https://www.youtube.com/watch?v=5qap5aO4i9A).

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

As I'm still in the _all static website_ trend, this project will be generate with **[Nuxt.js](https://nuxtjs.org/)** static mode and served using my trusty **[Yeetify](https://github.com/tinawng/yeetify)** static server 💨.

# Puzzle solving 🧩

I like breaking down big problems into smaller one but it's important to keep all the pieces in mind. Solving one part of a problem _smartly_ can snowball _in a good way_ for others parts of others problem.

With that in mind, let's start _bottom-up_ with the data.

## Album datas

### Tracks list

An important aspect is to not host any file _directly_. Instead we're gonna stream all the albums from youtube using an hidden iframe 🚀

One cool aspect of this approach is that I can use the Youtube API to get the video description. In lot of cases it contains the album track list with their time stamps! We _just_ need to parse the description and build the tracklist.

Writing the parser was a long and tedious task 😓 but I managed to have an algorithm that work in most cases. You can check it out on the [Github repo](https://github.com/tinawng/chill/blob/main/plugins/albums-parser.js).

### Album set

In order to have my precious _✨hand picked✨_ albums selection, I just added a JSON file with all the albums' Youtube links like following:

```js[album.json]
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

### Script pre-running

As you can imagine, running the _album parser_ script for every registered albums take some time, not a lot, but still. That's why I'm using Nuxt's `asyncData` function 💖.

```js[index.vue]
async asyncData({ $albums }) {
	var albums = $albums;
    return { albums };
},
```

When generating static pages Nuxt will only run this script server side, as specified in `nuxt.config.js`

```js
plugins: [
    { src: '@/plugins/albums-parser.js', mode: 'server' }
],
```

Nuxt will then put the data in a payload js file which will be loaded at the very beginning of the page.

```js[/_nuxt/static/__hash__/payload.js]
__NUXT_JSONP__("/", {
	data:[{
		albums: {
			type:"album",genre:void 0,name:"Cozy Winter",yo...
		}
	}]
});
```

And yes, the album cover is not hosted as well. It's loaded from one of Bandcamp CDN 😁

See what I did here ? Four challenges met 💪

I reduce assets hosting to bare minimum using external hosts and JSONify albums set allows me to infinitely choose a random album in my album array.

## UI / UX

### Desktop

UI was grealty and generously inspired by **Window Groove Music App** clean and minimalist design.

<markdown-image src="instant-chill-music/windows-groove.jpg" alt="windows groove" description="Windows Groove ~ very nice UI isn't it ? 💄"></markdown-image>

I made some tweaks here and there to better suit my taste and use case but keeping the essence of it, like the blurry album cover and text aligned to the right.

On the other hand, the album selection menu was a total improvisation which turns out pretty well in my opinion 🥰

> Don't forget you can try it by yourself live [right here 🔗](https://chill.tina.cafe/)

### Mobile

Since I've seen this design, I was waiting for a good oppurtunity to use it. A huge shoutout to [Ekko Design 🎉](https://www.ekkodesign.no/work/chillhop-music-app-ui-concept) for this amazing mobile app concept !

<markdown-image src="instant-chill-music/ekko-design.jpg" alt="ekko-design"></markdown-image>

Again, a few small adjustments later and I have a mobile UI ✨.

# And the trouble begins...

## Progress Bar

In more _'normal'_ usage you are not hiding the youtube video iframe. What's why, _I think_, both youtube embed player iframe and the _youtube-player_ module I used don't have any event to listen to for time tracking.

That's a bummer 😒

What I end up with is a `setInterval` method, updated every 3 seconds like so:

```js[index.vue ~ script]
setInterval(async () => {
	this.player_current_time = parseInt(await this.player.getCurrentTime());
}, 3000);
```

`player_current_time` is then `watched` for updating the `current_track` accordingly to the album's track list and time stamps.

```js[index.vue ~ script]
watch: {
	player_current_time: function (time) {
		this.current_track = this.findTrack(time);
	},
},
```

With this approach, I can't make a decent progress bar. Updating every 3 seconds is not enough for smooth progress and I don't want to go faster for performance reasons as it needs to run on mobile.

Actually it's not that big of a deal as this app is supposed to be a background music player 🤷‍♀️
I mean, you're not seeking through the track very often and you still can't do it on webradios. I found the lack of a progress bar actually makes the design even more minimalistic 😁 and you can still browse the track list if you want.

## Detecting mobile

I discover that finding if client is using mobile or desktop using javascript is actually stricky. There is some Nuxt module that give you this information based on `user-agent` request header. Unfornunately, as I'm running a static website, none of this module can work.

On top of that, I'm to a big fan of using the _user-agent_. I don't know if it is 100% reliable and I want user to have to mobile UI on desktop if the browser is resized small enough.

For CSS, I can use `media queries` but for JS I need to be smarter. What I endup using is the same trick I used for my _Responsive Image Loader_

```js[index.vue ~ script]
isMobile() {
	this.is_mobile = !window.matchMedia("(min-width: 768px)").matches;
},
```

## Prevent mobile sleep

Rembember when I said everything is streamed from Youtube ? Well, that means that, unlike a _'real'_ music player app, this cannot play music if your mobile screen is locked. There is no workaround for this unless you are using a specific browser or a dedicated app. 😢

However, what I can do is prevent the screen from turning off 💡

How ? Instead of hiding the youtube video, I resize it to 1px by 1px. So technically even though you can't see it a video is being played, preventing your screen from going to sleep mode 🚫💤

```js[index.vue ~ script]
this.player = YouTubePlayer("player", {
	height: "1",
	width: "1"
});
```

```css[index.vue ~ style]
iframe {
	@apply absolute bottom-0 right-0 md:hidden;
}
```

## Autoplay

This one fall into the _strange behavior 👽_ category. By that I mean sometimes it works and sometimes not.

On paper, autoplay is strongly discouraged from any video or audio source. You can take as an example the Web Audio API which will not play any sound without user intervention in the first place.

I think depending on the events and callbacks timing, it turns out that autoplay work in most cases 🤷‍♀️

# Conclusion time

This project raised many challenges. One of them being the album-parser script as I want have maximum automation for this.

Combining completely different mobile and desktop user interfaces for one website was also a really big challenge 😵

The final product really met expectation and I'm really proud of how it turn out in terms of functionality and UI 🎊🎉
