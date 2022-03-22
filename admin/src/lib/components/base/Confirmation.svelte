<script lang="ts">
  import Icon from "$lib/components/icon";
  import { createEventDispatcher, tick } from "svelte";
  import BaseModal from "./BaseModal.svelte";
  import Typography from "./Typography.svelte";

  export let isOpen = false;
  export let title = "";
  export let positiveText: string;
  export let negativeText: string;
  export let initialFocus: "positive" | "negative" = "negative";

  let negative: HTMLButtonElement;
  let positive: HTMLButtonElement;

  const dispatch = createEventDispatcher();

  const onConfirm = (confirmation: boolean) => (event) => {
    dispatch("confirm", confirmation);
  };

  async function focus() {
    if (initialFocus === "negative") {
      await tick();
      negative.focus();
    } else if (initialFocus === "positive") {
      await tick();
      positive.focus();
    }
  }

  $: if (isOpen) {
    focus();
  }
</script>

<BaseModal {isOpen}>
  <div class="sm:flex sm:items-start">
    <div
      class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
    >
      <Icon icon="OutlineExclamation" />
    </div>
    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full pr-12">
      <Typography variant="h3">{title}</Typography>
      <div class="mt-2 max-h-60 overflow-auto dark:text-primary-100">
        <slot />
      </div>
    </div>
  </div>
  <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
    <button
      on:click={onConfirm(false)}
      type="button"
      class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
      bind:this={negative}
    >
      {negativeText}
    </button>
    <button
      on:click={onConfirm(true)}
      type="button"
      class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 dark:text-primary-100 text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
      bind:this={positive}
    >
      {positiveText}
    </button>
  </div>
</BaseModal>
