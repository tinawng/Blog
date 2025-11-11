<script setup>
  const { data: posts } = await useAsyncData(() => {
    return queryCollection("posts")
      .order("date", "DESC")
      .select("title", "description", "path", "cover_color", "cover_text", "slug", "tags", "date")
      .all()
  })
</script>

<template>
  <div>
    <section class="hero">
      <h1 class="mb-1">Tina Blog</h1>
      <h4>quick dev stories</h4>
      <div class="w-28 my-8 flex justify-between">
        <a href="https://tina.cafe">
          <icon variant="book-open" :stroke="2" />
        </a>
        <a href="https://github.com/tinawng">
          <icon variant="github" :stroke="2" />
        </a>
        <a href="https://www.instagram.com/tina_likes_cafe/">
          <icon variant="instagram" :stroke="2" />
        </a>
      </div>
      <p class="tracking-wide">
        A <b>non-award winning</b> blog about my web dev journey.<br />
        Sharing quick stories on how I <b>solve</b> and <b>create</b> new things.<br />
        Gracefully <b>illustrated</b> ✨ and <b>emoji</b> punctuated ✍️.
      </p>
    </section>

    <section class="latest">
      <h4 class="mb-1">Latest posts</h4>
      <div class="latest__posts">
        <div v-for="post in posts.slice(0, 2)" :key="post.title" class="latest__posts__card">
          <NuxtLink :to="post.path">
            <div class="latest__posts__card__cover" :class="`bg-${post.cover_color}-100`">
              <div v-if="post.cover_text">
                {{ post.cover_text }}
              </div>
              <img v-else :src="`/img/posts/${post.slug}/cover.png`" :alt="post.slug" />
            </div>
          </NuxtLink>
          <h2 class="my-3">{{ post.title }}</h2>
          <p>
            {{ post.description }}
          </p>
          <div class="post__tags">
            <span v-for="tag in post.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="bulk">
      <div v-for="post in posts.slice(2)" :key="post.title" class="bulk__post">
        <div class="bulk__post__text">
          <h2 class="mb-1">{{ post.title }}</h2>
          <p>
            {{ post.description }}
          </p>
          <div class="post__tags">
            <span v-for="tag in post.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
        <NuxtLink :to="post.path">
          <div class="bulk__post__cover" :class="`bg-${post.cover_color}-100`">
            <div v-if="post.cover_text">
              {{ post.cover_text }}
            </div>
            <img v-else :src="`/img/posts/${post.slug}/cover.png`" :alt="post.slug" />
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<style lang="postcss" scoped>
  .bulk__post {
    @apply h-48;
    @apply mb-12;
    @apply grid grid-cols-3 gap-8;
  }
  .bulk__post__text {
    @apply h-full;
    @apply col-span-2;
  }
  .bulk__post__cover {
    @apply h-full w-full;
    @apply rounded-lg;
    @apply flex justify-center items-center;
    @apply text-center text-4xl;
  }

  .latest__posts {
    @apply w-full;
    @apply grid grid-cols-2 gap-8;
  }
  .latest__posts__card {
  }
  .latest__posts__card__cover {
    @apply h-56;
    @apply rounded-lg;
    @apply flex justify-center items-center;
    @apply text-center text-6xl;
  }

  .post__tags {
    @apply mt-6;
    @apply text-xs;
    @apply flex flex-wrap;
  }
  .post__tags > span {
    @apply mb-2 mr-3;
    @apply py-1 px-3;
    @apply rounded-md bg-gray-100;
    @apply tracking-wide;
  }

  .hero {
    @apply max-w-xl;
    @apply mt-8 pb-10 mx-auto;
    @apply flex flex-col justify-center items-center text-center;
  }

  .hero h1 {
    @apply relative;
  }
  .hero h1:before {
    content: "✏️";
    @apply absolute -left-24;
  }

  section {
    @apply mb-16;
  }
</style>
