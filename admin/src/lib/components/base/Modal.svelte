<script lang="ts">
  import { IconButton, Typography } from "$lib/components/base";
  import { createEventDispatcher } from "svelte";
  import { fly } from "svelte/transition";
  import BaseModal from "./BaseModal.svelte";

  export let isOpen = false;
  export let title = "";

  const dispatch = createEventDispatcher();

  function onClose() {
    dispatch("close");
  }
</script>

<BaseModal {isOpen} on:close={onClose} size="lg">
  <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
    <IconButton icon="OutlineX" on:click={onClose} />
  </div>
  <div class="h-full">
    <div class="text-center sm:text-left h-full">
      <Typography variant="h3">{title}</Typography>

      <div
        class="mt-2 pb-5 w-full border-t border-gray-200 dark:border-gray-900 h-full overflow-auto"
      >
        <slot />
      </div>
    </div>
  </div>
</BaseModal>
