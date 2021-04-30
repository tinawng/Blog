---
slug: reverse-engineering-a-streaming-website-ep-1
title: Reverse engineering a streaming website ~ Ep.1 
description: In this serie I will introduce you to the most interesting websites that I have come across and how I managed to bypass their protection in order to download their precious videos.
cover_text: 🔧📺
cover_color: purple
date: 2021-04-27
author: Tina Wang
tags: [Reverse Engineer, Front End]
---

What I like to do during my long sleepness night, is randomly seek across *'disreputable'* streaming website, trying to find new animes or series to watch.

Relying on these kind of websites is **absolutly not safe**. They can disapear at any time without any warning. So what I end up doing is downloading all the videos available when I found intersest in a particular anime, in case everything vanished before I was done watching it all 👀

This is when things get interesting.

The owners of these websites develop very interesting and creative ways to counter people like me so we have to keep using their **ad bloated** website.

But you know me, I like challenges 😜

In this serie, I will introduce you to the most interesting website that I have come across and how I managed to bypass their protection.

#### Disclaimer: For obvious reasons, I will not reveal the website or any content that may lead to it. This is done for ~~fun~~ educational purposes only.

# The target 🎯

<markdown-image :src="slug + '/website-screenshot-1.jpg'" alt="website-screenshot-1"></markdown-image>

Let's do a quick first overview first.

This one looks like a very basic **WordPress** website with its usual load of ad popup, but without any aggressive anti-adblock detection what so ever. Great start.

What really cought my eye on this one is the video player. Most of the time on this kind of website, they use custom players or embed iframe from other website. But here we have the very default **HTML5 video player** 😮

<markdown-image :src="slug + '/website-screenshot-2.jpg'" alt="website-screenshot-2"></markdown-image>

# First attack ⚔️

The HTML5 video player has a built-in download feature which has obviously been disabled here. Let's try to enable it again.

First thing to notice is that there isn't any dark pattern involved to block the use of DevTools. Nice 👌

Let's dive into the page html code 🤿

<markdown-image :src="slug + '/website-screenshot-3.jpg'" alt="website-screenshot-3"></markdown-image>

See that `controlslist` attribut on the `<video>` tag ? Let's see what happens if I remove the `nodownload` value

<markdown-image :src="slug + '/website-screenshot-4.jpg'" alt="website-screenshot-4"></markdown-image>

Ladies and gents, we have the download button back 🤘 Just need to click on it and... You really think it's gonna be that easy ? This is what happen when I try downloading the video.

<markdown-image :src="slug + '/website-screenshot-5.jpg'" alt="website-screenshot-5"></markdown-image>

Mmmmmh 🤔 You know what, let's just use the video source link set in the `src` attribut of the `<player>`. Let's do it raw by just copying and pasting it in the browser navigation bar. This should open a page with nothing but the video on it.

<markdown-image :src="slug + '/website-screenshot-6.jpg'" alt="website-screenshot-6"></markdown-image>

Well, I'm not that surprised but still... and yes the player is *still working* fine.

Let the real game begin 😈

# The mighty _Network_ tab 🔮

Let's reload the page and see what is comming in. Hopefully we'll se the video stream passing by.

<markdown-image :src="slug + '/website-screenshot-7.jpg'" alt="website-screenshot-7" description="Click to enlarge 🔍"></markdown-image>

Let's focus on the last two queries as they relate to the video.

<markdown-image :src="slug + '/website-screenshot-8.jpg'" alt="website-screenshot-8" description="Click to enlarge 🔍"></markdown-image>

`Request URL` can't lie (at least not to my knowledge). Video's url in the request is the very same as in the `<video>` tag and it still manages to get the video without troubles.

Response Headers looks fine. `206 Partial Content` is nothing surprising for video content, `Content-Type` is `video/mp4` and `Content-Length` value is not 0.

 From here I will make two hypotheses. First one is that they managed to change the shown URL at the very last moment, fooling the DevTool on what the requested URL really is. Second one is that they are relying on some data somewhere, like a cookie for example, to identify from where the request is emited.

## The _'hidding trick'_ hypotese 🧐

Because a trick of this kind is necessarily performed in JS, I'm going to spy around all of the JS code I can found. As you can see in the network recordings right above, there's not a lot of JS file loaded.

So let's explore website sources, hoping to find something interesting.

<markdown-image :src="slug + '/website-screenshot-9.jpg'" alt="website-screenshot-9" description="This view is from the 'Sources' devtools tab"></markdown-image>

Erff.. Not a lot to play with. In fact, based on their names, not a single JS file looks promising. As they only contain so little code I'll inspect them all. 

As html file can contains chunks of JS code, I'm going to take a look at `index.html` as well. It's the very first loaded file when visiting a website so it's a great place to hide some sneaky code 👻

- `index.html` sadly nothing here, except some ad related script like google ad token or loading other js files.
- `comment-reply.js` effectively contains JS relative to the comments section.
- `wp-emoji-release.js` seems genuinely emoji related as I found some unicode and svg code.
- `wp-embed.js` this one contains some iframe code with secret handling like shown below. But since the video player is not an iframe, again, nothing of interest here.

```js[wp-embed.js]
d.querySelectorAll('iframe[data-secret="' + t.secret + '"]')
```

I was hoping to find video some kind of jquery selector like `$("#video).changeUrlOrSomething` in these files but sadly nothing remotly related to the video 🤷‍♀️

Never mind, let's continue shall we ?

## The _'cookie'_ hypotese 🍪

As surprising as it sounds, this website does not store any cookies. Both `Cookies` and `Local Storage` are shown completly empty inside the DevTools 🤯

So perhaps cookies are not the medium used to identity the source of the video request. There must be something I'm missing.

I'm going to pull out my favorite REST client [**Insomnia**](https://insomnia.rest/) and try making a simple `GET` request on the video URL.

<markdown-image :src="slug + '/website-screenshot-10.jpg'" alt="website-screenshot-10" description="'works' as intended"></markdown-image>

Let's go back the video request URL shown earlier and focus on the request headers. I going brain-less here by copy and paste all the headers of the original request into my Insomia request.

<markdown-image :src="slug + '/website-screenshot-11.jpg'" alt="website-screenshot-11"></markdown-image>

Woaw ! Yes, I cancelled the request because it was taking to long. But this is a *VERY* good sign 🙌

See the `151,1 MB` in the top right corner ? This indicates the size of the server response. What's why the request was taking so long. Because it was loading the whole video!

We are almost there 🏁

Let's find out what header is responsible for all of this. And I think a already found it... How could I not have seen it before 🤦‍♀️🤦‍♀️ See that `Referer` header ? Sorry for the blurry URL but you can compare it, not to the video URL but to the page hosting the video URL. And it's a match.

For good measure, I'm going to try with this header only

<markdown-image :src="slug + '/website-screenshot-12.jpg'" alt="website-screenshot-12"></markdown-image>

And it works 🎉🎊

Since Insomnia is not made for downloading videos, I'm simply going to use the `wget` UNIX command with the right header like so:

```bash
wget -d
    --header="Referer: https://streaming_website.com/some_anime/season_1_episode_1/"
    https://streaming_website.com/wp-content/uploads/some_anime/season_1_episode_1.mp4
```

This command is pretty verbose and gives a lot of details so, long story short, this is the end results:

```
---request begin---
GET /wp-content/uploads/some_anime/season_1_episode_1.mp4 HTTP/1.1
User-Agent: Wget/1.20.3 (linux-gnu)
Accept: */*
Accept-Encoding: identity
Host: streaming_website.com
Connection: Keep-Alive
Referer: https://streaming_website.com/some_anime/season_1_episode_1/

---request end---
HTTP request sent, awaiting response...
---response begin---
HTTP/1.1 200 OK
Date: some_day
Server: Apache
Last-Modified: Mon, 11 Mar 2019 04:04:38 GMT
Accept-Ranges: bytes
Content-Length: 420029116
Keep-Alive: timeout=5, max=100
Connection: Keep-Alive
Content-Type: video/mp4

---response end---
200 OK
Registered socket 3 for persistent reuse.
Length: 420029116 (401M) [video/mp4]
Saving to: ‘season_1_episode_1.mp4’

season_1_episode_1.mp4     9%[=====>                ]  38.96M  13.5MB/s
```

And that, is how you download a video from a streaming website despite its protections. At least for this one 😋

Thank you for reading, hope you like it 🙏

Be sure that I will continue posting this kind of reverse engineer little stories. This was quite an easy one and only take about 30 to 45min to solve. Hope to find a more harder one in the futur 💪