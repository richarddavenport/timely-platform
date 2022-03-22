<script lang="ts">
  import Icon, { IconType } from "$lib/components/icon";

  export let icon: IconType;
  export let title: string = "";
  export let badgeNumber: number = undefined;
</script>

<button
  type="button"
  class="bg-white dark:bg-gray-800 rounded-md text-gray-400 dark:text-primary-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 {$$props.class ||
    ''}"
  on:click
  {title}
>
  <span class="relative inline-block">
    <Icon {icon} />
    {#if badgeNumber}
      <span
        class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"
      >
        {badgeNumber}
      </span>
    {/if}
  </span>
</button>
