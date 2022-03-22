<script lang="ts">
  import { Typography } from "$lib/components/base";
  import type { CostAdjustmentLookup_Set_Input } from "$lib/graphql.types";
  import { updateCostAdjustmentLookup } from "$lib/queries/costAdjustments";
  import lodash from "lodash";
  const { uniqueId } = lodash;
  import { tick } from "svelte";
  let inputId = uniqueId("cost-adjustment-lookup-id-");

  export let id: string;
  export let type: "text" | "number" = "number";
  export let value: string | number;
  export let property: keyof CostAdjustmentLookup_Set_Input;

  let editing = false;
  let input: HTMLInputElement;

  function onDocumentClick(
    event: MouseEvent & {
      currentTarget: EventTarget & Window;
    }
  ) {
    if (
      !event
        .composedPath()
        .some(
          (path: HTMLElement) =>
            path.classList && path.classList.contains(inputId)
        )
    ) {
      editing = false;
    }
  }

  async function onClick() {
    editing = true;
    await tick();
    input.focus();
  }

  function onBlur() {
    editing = false;
    updateCostAdjustmentLookup({
      id,
      set: {
        [property]: value.toString(),
      },
    });
  }

  const setType = (node) => {
    node.type = type;
  };
</script>

<svelte:window on:click={(event) => onDocumentClick(event)} />

{#if editing}
  <input
    use:setType
    class="focus:ring-primary-500 focus:border-primary-500 sm:text-sm py-1 mx-1 px-2 rounded-md {inputId}"
    on:blur={onBlur}
    bind:value
    bind:this={input}
    on:click|stopPropagation={() => {}}
  />
{:else}
  <div on:click|stopPropagation={onClick}>
    <Typography variant="td2">{value}</Typography>
  </div>
{/if}
