<template>
  <div class="post__container">
    <h4>{{ dateFormat(post.date) }}</h4>
    <h1 class="mb-8 post__title">{{ post.title }}</h1>
    <div v-if="post.author" class="post__author">
      <div class="flex items-center">
        <img
          class="post__author__profile_pic"
          :src="require(`~/assets/img/${author_pp_path}`)"
        />
        <span class="post__author__name">{{ post.author }}</span>
      </div>
      <div class="post__author__socials">
        <a href="https://github.com/tinawng">
          <icon variant="github" :size="22" :stroke="2" />
        </a>
        <a href="https://www.instagram.com/tina_likes_cafe/">
          <icon variant="instagram" :size="22" :stroke="2" />
        </a>
      </div>
    </div>
    <div class="post__cover" :class="`bg-${post.cover_color}-100`">
      <div v-if="post.cover_text">
        {{ post.cover_text }}
      </div>
      <img v-else :src="post_cover_image" :alt="post.slug" />
    </div>
    <p>{{ post.description }}</p>

    <nuxt-content :document="post" />

    <div class="mt-16 border-t border-gray-600"></div>
    <h3 class="mt-24">Coming up next 👇</h3>
    <div class="next__post">
      <div class="next__post__text">
        <h2>{{ post.title }}</h2>
        <p>
          {{post.description}}
        </p>

        <div class="next__post__tags">
          <span v-for="tag in post.tags" :key="tag">{{ tag }}</span>
        </div>
      </div>
      <NuxtLink :to="post.path">
        <div class="next__post__cover" :class="`bg-${post.cover_color}-100`">
          <div v-if="post.cover_text">
            {{ post.cover_text }}
          </div>
          <img v-else :src="getPostCoverImage(post.slug)" :alt="post.slug" />
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  layout: "post",

  async asyncData({ $content, params, error }) {
    const post = await $content("/posts/" + params.pathMatch)
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: "Post not found" });
      });

    return { post };
  },

  computed: {
    author_pp_path: function () {
      return (
        "profile-pictures/" +
        this.post.author.toLowerCase().replace(" ", "-") +
        ".jpg"
      );
    },
    post_cover_image: function () {
      try {
        var img = require(`~/assets/img/covers/${this.post.slug}.png`);
      } catch (error) {}
      return img;
    },
  },

  methods: {
    dateFormat(date) {
      var d = new Date(date).toDateString();
      let day = d.split(" ")[2];
      let month = d.split(" ")[1];
      let year = d.split(" ")[3];

      var formated_date = `${day} ${month}, ${year}`;
      return formated_date;
    },
  },
};
</script>

<style lang="postcss" scoped>
.post__title {
  @apply font-extrabold;
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

.next__post {
  @apply h-36;
  @apply mb-24;
  @apply grid grid-cols-3 gap-8;
}
.next__post__text {
  @apply h-full;
  @apply col-span-2;
}
.next__post__text > h2 {
  @apply mt-1 mb-2;
}
.next__post__cover {
  @apply h-full w-full;
  @apply rounded-lg;
  @apply flex justify-center items-center;
  @apply text-center text-4xl;
}
.next__post__tags {
  @apply mt-6;
  @apply text-xs;
}
.next__post__tags > span {
  @apply mr-3;
  @apply py-1 px-3;
  @apply rounded-md bg-gray-100;
  @apply tracking-wide;
}
</style>
