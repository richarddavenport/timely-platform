<script lang="ts">
  import { Typography } from "$lib/components/base";
  import type { CostAdjustmentLookup, ProductCost } from "$lib/graphql.types";
  import { createPopper } from "@popperjs/core";

  export let item: {
    cost: {
      productCost: Partial<ProductCost>;
      costAdjustmentLookup: Partial<CostAdjustmentLookup>;
      rateBucketType: string;
    }[];
    total: number;
  };

  let popoverShow = false;
  let container: HTMLElement;
  let btnRef: HTMLElement;
  let popoverRef: HTMLElement;

  function togglePopover() {
    if (popoverShow) {
      popoverShow = false;
    } else {
      popoverShow = true;
      createPopper(btnRef, popoverRef, {
        placement: "top",
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 8],
            },
          },
        ],
      });
    }
  }
  function handleWindowEvent(event: MouseEvent) {
    if (!container) return;
    // @ts-ignore
    if (container.contains(event.target)) return;
    popoverShow = false;
  }
</script>

<svelte:window on:click={handleWindowEvent} />

<td class="px-6 py-4" bind:this={container}>
  <span bind:this={btnRef} on:click={togglePopover}>
    <Typography variant="td1" class="whitespace-nowrap">
      {item.total}
    </Typography>
  </span>
  <div id="tooltip" role="tooltip" bind:this={popoverRef}>
    <div
      class="border rounded-md p-2 bg-gray-100 {popoverShow
        ? 'block'
        : 'hidden'}"
      id="tooltip"
      role="tooltip"
    >
      <ul role="list" class="divide-y divide-gray-200">
        {#each item.cost as costItem}
          <li
            class="relative bg-white py-5 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
          >
            <div class="flex justify-between space-x-3">
              <div class="min-w-0 flex-1">
                <a href="/" class="block focus:outline-none">
                  <span class="absolute inset-0" aria-hidden="true" />
                  <p class="text-sm font-medium text-gray-900 truncate">
                    {costItem.productCost.costAdjustment.name}
                  </p>
                  <p class="text-sm text-gray-500 truncate">
                    Base Cost: {costItem.productCost.costAdjustment.baseCost}
                  </p>
                </a>
              </div>
            </div>
            <div class="mt-1">
              <p class="line-clamp-2 text-sm text-gray-600">
                {#if !costItem.costAdjustmentLookup}
                  Default Cost: {costItem.productCost.costAdjustment
                    .defaultLookupCost}
                {:else if costItem.costAdjustmentLookup?.singleValue}
                  {costItem.costAdjustmentLookup?.singleValue}: {costItem
                    .costAdjustmentLookup.cost}
                {:else}
                  {costItem.costAdjustmentLookup?.startValue} - {costItem
                    .costAdjustmentLookup?.endValue}: {costItem
                    .costAdjustmentLookup.cost}
                {/if}
              </p>
            </div>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</td>
