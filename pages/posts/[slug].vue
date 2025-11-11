<script setup>
  definePageMeta({
    layout: "post",
  })

  const route = useRoute()

  const { data: post } = await useAsyncData(route.path, () => {
    return queryCollection("posts").path(route.path).first()
  })
  const { data: surrounding_posts } = await useAsyncData(() => {
    return queryCollectionItemSurroundings("posts", route.path, { fields: ["description", "cover_text", "cover_color", "tags"] })
  })

  const author_pp_path = "profile-pictures/" + post.value.author.toLowerCase().replace(" ", "-") + ".jpg"
  const post_cover_image = `/img/posts/${post.value.slug}/cover.png`

  function dateFormat(date) {
    const d = new Date(date).toDateString()
    const day = d.split(" ")[2]
    const month = d.split(" ")[1]
    const year = d.split(" ")[3]
    return `${day} ${month}, ${year}`
  }
  function openNewTab(href) {
    window.open(href, "_blank")
  }
</script>

<template>
  <div class="post__container">
    <h4>{{ dateFormat(post.date) }}</h4>
    <h1 class="mb-8 post__title">{{ post.title }}</h1>
    <div v-if="post.author" class="post__author">
      <div class="flex items-center">
        <img class="post__author__profile_pic" :src="`/img/${author_pp_path}`" />
        <span class="post__author__name">{{ post.author }}</span>
      </div>
      <div class="post__author__socials">
        <a href="https://github.com/tinawng">
          <icon class="post__author__socials__icon" variant="github" :size="22" :stroke="2" />
        </a>
        <a href="https://www.instagram.com/tina_likes_cafe/">
          <icon class="post__author__socials__icon" variant="instagram" :size="22" :stroke="2" />
        </a>
      </div>
    </div>
    <div class="post__cover" :class="`bg-${post.cover_color}-100`">
      <div v-if="post.cover_text">
        {{ post.cover_text }}
      </div>
      <img v-else :src="post_cover_image" :alt="post.slug" />
    </div>

    <div v-if="post.live || post.repo" class="post__ext_links">
      <div v-if="post.live" class="post__ext_links__link" @click="openNewTab(`https://${post.live}/`)">
        <icon class="post__ext_links__link__icon" variant="compass" :size="32" :stroke="1.8" />
        <h3 class="post__ext_links__link__name">{{ post.live }}</h3>
        <span class="post__ext_links__link__emoji">🔗</span>
      </div>
      <div v-if="post.live && post.repo" class="my-6 border-t border-gray-300"></div>
      <div v-if="post.repo" class="post__ext_links__link" @click="openNewTab(`https://${post.repo}/`)">
        <icon class="post__ext_links__link__icon" variant="github" :size="32" :stroke="1.8" />
        <h3 class="post__ext_links__link__name">{{ post.repo }}</h3>
        <span class="post__ext_links__link__emoji">🔗</span>
      </div>
    </div>

    <!-- <nuxt-content :document="post" /> -->
    <ContentRenderer :value="post" />

    <div class="mt-16 border-t border-gray-600"></div>
    <h3 class="mt-24">Coming up next 👇</h3>
    <NuxtLink class="next_post" :to="surrounding_posts[0].path">
      <div class="next_post__text">
        <h2>{{ surrounding_posts[0].title }}</h2>
        <p>
          {{ surrounding_posts[0].description }}
        </p>

        <div class="next_post__tags">
          <span v-for="tag in surrounding_posts[0].tags" :key="tag">{{ tag }}</span>
        </div>
      </div>
      <div >
        <div class="next_post__cover" :class="`bg-${surrounding_posts[0].cover_color}-100`">
          <div v-if="surrounding_posts[0].cover_text">
            {{ surrounding_posts[0].cover_text }}
          </div>
          <img v-else :src="`/img/posts/${surrounding_posts[0].slug}`" :alt="surrounding_posts[0].slug" />
        </div>
      </div>
    </NuxtLink>

    <!-- Forcing class safelist here, don't mind me 🙈 -->
    <div
      class="bg-slate-100 bg-gray-100 bg-zinc-100 bg-neutral-100 bg-stone-100 bg-red-100 bg-orange-100 bg-amber-100 bg-yellow-100 bg-lime-100 bg-green-100 bg-emerald-100 bg-teal-100 bg-cyan-100 bg-sky-100 bg-blue-100 bg-indigo-100 bg-violet-100 bg-purple-100 bg-fuchsia-100 bg-pink-100 bg-rose-100"
    />
  </div>
</template>

<style lang="postcss" scoped>
  .post__title {
    @apply font-extrabold;
  }

  .post__ext_links {
    @apply mb-12;
    @apply py-5 px-8;
    @apply rounded-lg shadow-md bg-steel-50;
  }
  .post__ext_links__link {
    @apply flex justify-start items-center;
    @apply text-gray-800;
    @apply cursor-pointer;
  }
  .post__ext_links__link__icon {
    @apply mr-6;
  }
  .post__ext_links__link__name {
    @apply m-0;
    @apply underline;
  }
  .post__ext_links__link__emoji {
    @apply ml-auto;
    @apply opacity-80;
    @apply text-xl;
  }
  .post__ext_links__link:hover .post__ext_links__link__icon {
    animation: 0.8s cubic-bezier(0.28, 0.84, 0.42, 1) 0s 1 bounce;
  }

  .post__cover {
    @apply h-96 w-full;
    @apply mt-8 mb-12;
    @apply rounded-lg;

    @apply flex justify-center items-center;
    @apply text-center text-7xl;
  }

  .post__author {
    @apply flex justify-between items-center;
  }
  .post__author__profile_pic {
    @apply h-12 w-12;
    @apply mr-4;
    @apply rounded-full;
  }
  .post__author__name {
    @apply font-bold capitalize;
  }
  .post__author__socials {
    @apply flex;
  }
  .post__author__socials > * {
    @apply ml-4;
  }
  .post__author__socials__icon:hover {
    animation: 0.8s cubic-bezier(0.28, 0.84, 0.42, 1) 0s 1 bounce-small;
  }

  .next_post {
    @apply h-36;
    @apply mb-24;
    @apply grid grid-cols-3 gap-8;
  }
  .next_post__text {
    @apply h-full;
    @apply col-span-2;
  }
  .next_post__text > h2 {
    @apply mt-1 mb-2;
  }
  .next_post__cover {
    @apply h-full w-full;
    @apply rounded-lg;
    @apply flex justify-center items-center;
    @apply text-center text-4xl;
  }
  .next_post__tags {
    @apply mt-6;
    @apply text-xs;
    @apply flex flex-wrap;
  }
  .next_post__tags > span {
    @apply mb-2 mr-3;
    @apply py-1 px-3;
    @apply rounded-md bg-gray-100;
    @apply tracking-wide;
  }
</style>
