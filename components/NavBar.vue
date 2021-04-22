<template>
  <section class="nav_bar__container">
    <transition name="slide-fade">
      <div v-if="show_nav" class="nav_bar__links">
        <h3 @click="scrollTo('hero')">About</h3>
        <h3 @click="scrollTo('projects')">Projects</h3>
        <h3 @click="scrollTo('footer')">Links</h3>
      </div>
    </transition>
    <div
      class="nav_bav__burger"
      @click="show_nav = !show_nav"
    >
      <span class="w-5" :class="[show_nav ? 'mb-0' : 'mb-1.5']"></span>
      <span
        class="w-3 parent-hover:w-5"
        :class="{ 'opacity-0': show_nav }"
      ></span>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    show_nav: false,
  }),
  methods: {
    scrollTo(section_name) {
      var el = this.$parent.$parent.$el.getElementsByClassName(section_name)[0];
      el.scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>

<style lang="postcss" scoped>
.nav_bar__container {
  @apply h-32;
  @apply flex justify-end items-center;
}

.nav_bar__links {
  @apply w-full flex justify-end mr-4;
}
.nav_bar__links h3 {
  @apply mx-2;
  @apply cursor-pointer;
}

.nav_bav__burger {
  @apply h-full;
  @apply flex flex-col justify-center items-end;
  @apply cursor-pointer;
}
.nav_bav__burger span {
  height: 2px;
  @apply bg-steel-800;
  transition: all 0.4s;
  transition-property: margin, width, opacity;
}
.nav_bav__burger:hover .parent-hover\:w-5 {
  @apply w-5;
}
</style>