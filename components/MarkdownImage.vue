<template>
  <div class="markdown_img__container" @click="is_enlarged = !is_enlarged">
    <img class="markdown_img__image" :class="{'markdown_img_enlarged__image': is_enlarged}" :src="imgSrc()" :alt="alt" />
    <p class="markdown_img__desc">{{ description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
    description: String,
  },
  data: () => ({
    is_enlarged: false,
  }),

  methods: {
    imgSrc() {
      try {
        return require(`~/assets/img/posts/${this.src}`);
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.markdown_img__container {
  max-width: 80%;
  width: 80%;
  @apply my-10 mx-auto;
}
.markdown_img__image {
  @apply mx-auto;
  @apply rounded-lg;
  min-width: 40%;
  transition: all .8s;
}
.markdown_img__desc {
  @apply mt-3;
  @apply text-center italic text-gray-600;
}

.markdown_img_enlarged__image {
  min-width: 64rem;
  transform: translateX(-12rem);

  /* transform: scale(2,2); */
}
</style>