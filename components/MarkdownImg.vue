<template>
  <p>
    <img :src="imgSrc()" :alt="alt" />
  </p>
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
  },
  methods: {
    imgSrc() {
      try {
        return require(`~/assets/img/posts/${this.src}`)
      } catch (error) {
        console.log(error)
        return null
      }
    },
  },
}
</script>