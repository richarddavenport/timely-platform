<script lang="ts">
  export let variant:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "button"
    | "caption"
    | "overline"
    | "td1"
    | "td2" = "body1";
</script>

<span class="{variant} {$$props.class || ''}">
  <slot />
</span>

<style type="text/postcss">
  .h1 {
    @apply text-3xl font-bold text-white dark:text-primary-100;
  }
  .h2,
  .h3 {
    @apply text-2xl leading-6 font-medium text-gray-900 dark:text-primary-100;
  }
  .h4 {
    @apply text-3xl;
  }
  .h5 {
    @apply text-2xl;
  }
  .h6 {
    @apply text-xl;
  }
  .subtitle1 {
  }
  .subtitle2 {
    @apply text-sm text-gray-500 dark:text-primary-100;
  }
  .body1 {
    @apply font-normal;
  }
  .body2 {
  }
  .button {
  }
  .caption {
  }
  .overline {
  }
  .td1 {
    @apply text-sm font-medium text-gray-900 dark:text-primary-50;
  }
  .td2 {
    @apply text-sm text-gray-900 dark:text-primary-50;
  }
</style>
