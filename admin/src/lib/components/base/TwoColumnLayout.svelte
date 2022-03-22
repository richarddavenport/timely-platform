<script lang="ts">
  import { IconButton } from ".";

  let collapsed = false;
</script>

<div class="bg-gray-100 dark:bg-gray-800 h-full">
  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <div
      class="lg:grid lg:grid-cols-12 lg:gap-x-6 {collapsed
        ? 'collapsed'
        : 'expanded'}"
    >
      <aside class="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 relative">
        <div
          class="h-6 absolute -right-6"
          on:click={() => (collapsed = !collapsed)}
        >
          <IconButton
            icon={collapsed
              ? "OutlineChevronDoubleRight"
              : "OutlineChevronDoubleLeft"}
            class="bg-transparent focus:ring-0 focus:ring-offset-0"
          />
        </div>
        <slot name="column1" />
      </aside>

      <main class="space-y-6 sm:px-6 lg:px-0">
        <slot name="column2" />
      </main>
    </div>
  </div>
</div>

<style type="text/postcss">
  .collapsed aside {
    @apply lg:col-span-1;
  }
  .collapsed main {
    @apply lg:col-span-11;
  }

  .expanded aside {
    @apply lg:col-span-3;
  }
  .expanded main {
    @apply lg:col-span-9;
  }
</style>
