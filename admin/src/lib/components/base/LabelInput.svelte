<script lang="ts">
  import { Select } from "$lib/components/base";
  import Input from "./Input.svelte";

  export let value: any = null;
  export let placeholder = null;
  export let label = null;
  export let isDisabled = false;
  export let type: "text" | "select" = "text";

  let id = label;
  $: {
    id = label.replace(/\s/g, "");
  }
</script>

<div class={$$props.class}>
  <label for={id} class="block text-sm font-medium text-gray-700">
    {label}
  </label>
  <div class="mt-1 relative">
    {#if type === "text"}
      <Input name={id} {id} bind:value disabled={isDisabled} {placeholder} on:input on:change />
    {:else if type === "select"}
      <Select {id} bind:value {placeholder} class="w-full" on:change>
        <slot />
      </Select>
    {/if}
  </div>
</div>
