<template>
  <div>
    <section class="hero">
      <h1 class="mb-1">Tina Blog</h1>
      <h4>quick dev stories</h4>
      <div class="w-28 my-12 flex justify-between">
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
      <p>
        Pitayan blog is a place publishing contents about web development! All
        articles are free to read and share. Come and find those inspiring
        stories.
      </p>
    </section>

    <section class="latest">
      <h4 class="mb-1">Latest posts</h4>
      <div class="latest__posts">
        <div
          v-for="post in latest_posts"
          :key="post.title"
          class="latest__posts__card"
        >
          <NuxtLink :to="post.path">
            <div class="latest__posts__card__thumbnail" />
          </NuxtLink>
          <h2 class="my-3">{{ post.title }}</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            egestas feugiat efficitur. Etiam finibus consectetur molestie.
            Maecenas maximus gravida turpis, nec dictum nunc tempor at. Ut
            rutrum vehicula sollicitudin.
          </p>
          <div class="post__tags">
            <span>Raspberry</span>
            <span>Sys. Admin</span>
            <span>NodeJS</span>
          </div>
        </div>
      </div>
    </section>

    <section class="bulk">
      <div v-for="post in bulk_posts" :key="post.title" class="bulk__post">
        <div class="bulk__post__text">
          <h2 class="mb-1">{{ post.title }}</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            egestas feugiat efficitur. Etiam finibus consectetur molestie.
            Maecenas maximus gravida turpis, nec dictum nunc tempor at. Ut
            rutrum vehicula sollicitudin.
          </p>
          <div class="post__tags mt-auto">
            <span>Raspberry</span>
            <span>Sys. Admin</span>
            <span>NodeJS</span>
          </div>
        </div>
        <NuxtLink :to="post.path">
          <div class="bulk__post__thumbnail"></div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    const latest_posts = await $content("posts")
      .sortBy("date", "desc")
      .limit(2)
      .fetch();
    const bulk_posts = await $content("posts")
      .sortBy("date", "desc")
      .skip(2)
      .fetch();

    return { latest_posts, bulk_posts };
  },
};
</script>

<style lang="postcss" scoped>
.bulk__post {
  @apply h-48;
  @apply grid grid-cols-3 gap-8;
}
.bulk__post__text {
  @apply h-full;
  @apply col-span-2;
}
.bulk__post__thumbnail {
  @apply h-full w-full;
  @apply rounded-lg bg-red-100;
}

.latest__posts {
  @apply w-full;
  @apply grid grid-cols-2 gap-8;
}
.latest__posts__card {
}
.latest__posts__card__thumbnail {
  @apply h-56;
  @apply rounded-lg bg-red-100;
}

.post__tags {
  @apply mt-6;
  @apply text-xs;
}
.post__tags > span {
  @apply mr-3;
  @apply py-1 px-3;
  @apply rounded-md bg-gray-100;
  @apply tracking-wide;
}

.hero {
  @apply max-w-xl;
  @apply mx-auto;
  @apply flex flex-col justify-center items-center text-center;
}

section {
  @apply mb-16;
}
</style>