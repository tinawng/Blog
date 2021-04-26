<template>
  <div class="layout__container">
    <NavBar />
    <Nuxt />
  </div>
</template>

<style lang="postcss">
#__layout {
  @apply min-h-screen;
  max-width: 64rem;
  @apply mx-auto;
}

h1 {
    font-family: 'Fira Sans';
    @apply text-6xl font-extrabold;
}
h2 {
  @apply text-2xl font-extrabold;
}
h3 {
  @apply font-bold;
}
h4 {
  font-family: 'Fira Sans';
  @apply text-lg italic font-bold text-gray-600
}
p {
  @apply text-base font-light text-gray-600;
}
b {
  @apply font-bold;
}
</style>
