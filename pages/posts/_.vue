<template>
  <div class="post__container">
    <h4>{{ dateFormat(post.date) }}</h4>
    <h1 class="mb-8">{{ post.title }}</h1>
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
      <img
        v-else
        :src="post_cover_image"
        :alt="post.slug"
      />
    </div>
    <p>{{ post.description }}</p>
    <nuxt-content :document="post" />
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
</style>
