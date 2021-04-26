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

/* 🐛 Specify .post__container to prevent layout styles leak */
.post__container h1 {
  font-family: "Fira Sans";
  @apply text-3xl font-medium;
}
.post__container h2 {
  @apply mt-14 mb-8;
  @apply text-xl font-bold;
}
.post__container h3 {
  @apply mb-6;
  @apply font-bold;
}
.post__container h4 {
  font-family: "Fira Sans";
  @apply text-sm italic font-bold text-gray-500;
}
.post__container h5 {
  @apply mb-6;
}
.post__container p {
  @apply mb-6;
  @apply text-base font-light text-gray-500 tracking-wide;
}

.nuxt-content h1 {
  @apply mt-14 mb-8;
}
.nuxt-content h4 {
  @apply mb-6;
}
.nuxt-content a {
  @apply underline;
}
.nuxt-content strong {
  @apply font-bold;
}
.nuxt-content em {
  font-weight: bolder;
}
.nuxt-content blockquote {
  @apply mb-6;
  @apply py-3 pl-4;
  @apply bg-gray-50;
  border-left-width: 3px;
  @apply border-gray-700;
  @apply italic;
}
.nuxt-content blockquote p {
  @apply mb-0;
}
.nuxt-content pre {
  @apply w-4/5;
  @apply mb-6 mx-auto;
  @apply rounded-lg bg-gray-50;
  @apply text-gray-500;
}
.nuxt-content p > code {
  @apply py-0.5 px-1.5;
  @apply rounded bg-gray-100 text-gray-700;
  /* color: #DD4A68; */
}

.nuxt-content ul {
  @apply ml-4 mb-6;
  @apply text-gray-500;
}
.nuxt-content li:before {
  content: '•';
  font-family: sans-serif;
  @apply mr-4;
}
</style>
