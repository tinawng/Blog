<script setup>
  defineProps({ logo: Boolean })
</script>

<template>
  <section class="nav_bar__container">
    <NuxtLink to="/" v-if="logo" class="nav_bar__logo">✏️ Tina Blog</NuxtLink>
  </section>
</template>

<style lang="postcss" scoped>
  .nav_bar__container {
    @apply h-32;
    @apply flex justify-end items-center;
  }

  .nav_bar__logo {
    @apply mr-auto;
    font-family: "Fira Sans";
    @apply text-2xl font-extrabold;

    animation: 1.2s cubic-bezier(0.25, 0.8, 0.5, 1) 0s 1 slide-in;
  }

  @keyframes slide-in {
    0% {
      opacity: 0;
      transform: translateX(4rem);
    }
    100% {
      opacity: 1;
      transform: translateX(0px);
    }
  }
</style>
