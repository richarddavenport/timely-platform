<script lang="ts">
  import { Typography } from ".";

  export let header: string;
  export let subHeader: string = undefined;
</script>

<div class="shadow dark:shadow-none sm:rounded-md {$$props.class || ''}">
  <div
    class="bg-white dark:bg-gray-800 dark:border dark:sm:rounded-t-md dark:border-primary-100 py-6 px-4 space-y-8 sm:p-6"
  >
    <div>
      <Typography variant="h3" class="block">
        {header}
      </Typography>
      {#if subHeader}
        <Typography variant="subtitle2">{subHeader}</Typography>
      {/if}
    </div>
    <slot />
  </div>
  {#if $$slots.footer}
    <div
      class="px-4 py-3 bg-gray-50 dark:bg-gray-700 dark:border-primary-100 dark:border dark:border-t-0 dark:sm:rounded-b-md text-right sm:px-6 min-h-14"
    >
      <slot name="footer" />
    </div>
  {/if}
</div>
