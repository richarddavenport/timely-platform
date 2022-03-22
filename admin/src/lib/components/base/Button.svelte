<script lang="ts">
  export let type: "button" | "submit" | "reset" = "button";
  export let link = false;
</script>

<button
  class="text-sm font-medium border-0 {link ? 'link' : 'btn'} {$$props.class ||
    ''} {$$props.disabled ? 'disabled' : ''}"
  {type}
  on:click
  {...$$props}
  disabled={$$props.disabled}
>
  <slot />
</button>

<style type="text/postcss">
  .btn {
    @apply px-4 py-2 rounded-md text-white bg-primary-500 dark:bg-gray-800 dark:text-primary-100 dark:border dark:border-primary-100 focus:outline-none focus:ring transition focus:ring-primary-300 active:bg-primary-700;
  }

  .link {
    @apply text-primary-500 hover:text-primary-900 dark:text-primary-100;
  }

  .disabled {
    @apply bg-gray-500 cursor-not-allowed;
  }
</style>
