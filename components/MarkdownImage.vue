<template>
  <div class="markdown_img__container">
    <img class="markdown_img__image" :src="imgSrc()" :alt="alt" />
    <p class="markdown_img__desc">{{description}}</p>
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
  @apply my-10 mx-auto;
}
.markdown_img__image { 
  @apply rounded-lg;
}
.markdown_img__desc {
  @apply mt-3;
  @apply text-center italic text-gray-600;
}
</style>