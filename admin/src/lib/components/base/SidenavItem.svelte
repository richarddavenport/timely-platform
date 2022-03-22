<script lang="ts">
  import type { IconType } from "$lib/components/icon";
  import Icon from "$lib/components/icon";

  export let active = false;
  export let icon: IconType;
</script>

<div
  class="{active
    ? 'active'
    : ''} hover:bg-white dark:hover:bg-gray-700 dark:text-primary-100 rounded-md px-3 py-2 flex items-center text-sm font-medium cursor-pointer"
  on:click
>
  <Icon
    {icon}
    class="{active
      ? 'icon'
      : ''} group-hover:text-primary-500 dark:group-hover:text-primary-100 flex-shrink-0 -ml-1 mr-3 h-6 w-6"
  />
  <span class="truncate">
    <slot />
  </span>
</div>

<style type="text/postcss">
  .active {
    @apply bg-gray-50 dark:bg-gray-700 text-primary-700 dark:text-primary-100 hover:text-primary-700 dark:hover:text-primary-100;
  }
  .icon {
    @apply text-primary-500 dark:text-primary-100;
  }
</style>
