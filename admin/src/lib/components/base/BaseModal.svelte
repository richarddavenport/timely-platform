<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Portal from "svelte-portal/src/Portal.svelte";
  import { fade, fly } from "svelte/transition";

  export let isOpen = false;
  export let clickOutsideClose = true;
  export let size: "sm" | "lg" = "sm";

  const dispatch = createEventDispatcher();

  function onClose() {
    dispatch("close");
  }
</script>

{#if isOpen}
  <Portal>
    <div
      class="fixed z-10 inset-0 overflow-y-auto pointer-events-none"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex items-end justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0 max-w-full pointer-events-auto"
      >
        <!-- Overlay -->
        <div
          transition:fade={{ delay: 0, duration: 300 }}
          on:click={() => clickOutsideClose && onClose()}
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        />

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        {#if size == "sm"}
          <div
            transition:fly={{ y: -200, duration: 300 }}
            class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
          >
            <slot />
          </div>
        {:else if size == "lg"}
          <div
            transition:fly={{ y: -200, duration: 300 }}
            class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:p-6 h-[calc(100vh-4rem)] w-[calc(100vw-4rem)]"
          >
            <slot />
          </div>
        {/if}
      </div>
    </div>
  </Portal>
{/if}
