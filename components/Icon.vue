<template>
  <svg
    :class="{ button_icon: button }"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="stroke"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <g v-if="!variant || variant == 'cloud'">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
    </g>
    <g v-else-if="variant == 'book-open'">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </g>
    <g v-else-if="variant == 'github'">
      <path
        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
      ></path>
    </g>
    <g v-else-if="variant == 'instagram'">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </g>
    <g v-else-if="variant == 'compass'">
      <circle cx="12" cy="12" r="10"></circle>
      <polygon
        points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"
      ></polygon>
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    variant: String,
    button: Boolean,
    size: {
      type: Number,
      default: 24,
    },
    stroke: {
      type: Number,
      default: 1.5,
    },
  },
};
</script>

<style lang="postcss">
.button_icon {
  @apply cursor-pointer;
  @apply rounded-sm;
}
.button_icon:hover {
  @apply bg-gray-200;
}
.button_icon:active {
  @apply bg-gray-300;
}
</style>