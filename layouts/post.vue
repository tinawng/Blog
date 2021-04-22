<template>
  <div class="layout__container">
    <NavBar logo />
    <Nuxt />
  </div>
</template>

<style lang="postcss">
#__layout {
  @apply min-h-screen;
  max-width: 64rem;
  @apply mx-auto;
}
.post__container {
  max-width: 48rem;
  @apply mt-8 mx-auto;
}

h1 {
  @apply mt-6 mb-12;
  font-family: "Fira Sans";
  @apply text-3xl font-extrabold;
}
h2 {
  @apply mt-6 mb-12;
  @apply text-2xl font-extrabold;
}
h3 {
  @apply mb-6;
  @apply font-bold;
}
h4 {
  @apply mb-6;
  font-family: "Fira Sans";
  @apply text-sm italic font-bold text-gray-500;
}
h5 {
  @apply mb-6;
}
p {
  @apply mb-6;
  @apply text-base font-light text-gray-500 tracking-wide;
}

.nuxt-content blockquote {
  @apply mb-6;
  @apply pt-5 pb-px pl-4;
  @apply bg-gray-50;
  border-left-width: 3px;
  @apply border-gray-700;
  @apply italic;
}

.nuxt-content pre {
  @apply bg-gray-50;
  @apply text-gray-500;
}

.nuxt-content code {
  @apply mx-0.5;
  @apply px-1;
  @apply bg-gray-50;
}
</style>
