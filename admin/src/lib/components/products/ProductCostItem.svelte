<script lang="ts">
  import {
    Button,
    Table,
    TBody,
    Td,
    Th,
    Thead,
    Tr,
  } from "$lib/components/base";
  import Icon from "$lib/components/icon";
  import { INPUT_DEBOUNCE_TIME_LONG } from "$lib/constants";
  import type {
    GetProductLayout_ProductCostFragment,
    GetProductLayout_Product_ProductRateBucketsFragment,
    RateBucketTypeBaseFragment,
  } from "$lib/graphql.types";
  import {
    insertProductRateBuckets,
    updateProductRateBucket,
  } from "$lib/queries/productRateBuckets";
  import { deleteProductCost } from "$lib/queries/products";
  import type { GqlFetchResult } from "$lib/utils/useQuery";
  import debounce from "lodash/debounce.js";
  import { createEventDispatcher } from "svelte";
  import { quintOut } from "svelte/easing";
  import { slide } from "svelte/transition";
  import Label from "../base/Label.svelte";

  export let productId: string;
  export let rateBucketType: RateBucketTypeBaseFragment;
  export let productCosts: GetProductLayout_ProductCostFragment[] = [];
  export let productRateBucket: GetProductLayout_Product_ProductRateBucketsFragment;

  const dispatch = createEventDispatcher();

  let showTable = false;
  let minimumCost = productRateBucket?.minimumCost;

  async function onInput() {
    let res: GqlFetchResult<any>;
    if (productRateBucket?.id) {
      res = await updateProductRateBucket({
        id: productRateBucket.id,
        set: { minimumCost },
      });
    } else {
      res = await insertProductRateBuckets({
        objects: [
          {
            productId,
            rateBucketTypeId: rateBucketType.id,
            minimumCost,
          },
        ],
      });
    }

    if (res.errors) {
      alert("error, check console");
      console.error(res.errors);
      return;
    }

    dispatch("refresh");
  }

  function toggleTable() {
    showTable = !showTable;
  }
</script>

<div class="pt-6">
  <dt>
    <div class="flex justify-between">
      <div on:click={toggleTable} class="flex content-center">
        <button type="button">
          {#if showTable}
            <Icon icon="OutlineChevronDown" />
          {:else}
            <Icon icon="OutlineChevronRight" />
          {/if}
        </button>
        <span class="ml-4 font-medium text-gray-900 self-center">
          {rateBucketType.name}
        </span>
        <span class="ml-1 self-center">
          ({productCosts.length})
        </span>
      </div>
      <span>
        <Label labelFor="mincost">Min Cost</Label>
        <input
          type="number"
          class="dark:bg-gray-700 dark:text-primary-100 focus:ring-primary-500 dark:focus:ring-primary-100 focus:border-primary-500 dark:focus:border-primary-100 sm:text-sm border-gray-300 rounded-md placeholder-primary-200 w-24"
          bind:value={minimumCost}
          name="minCost"
          id="minCost"
          on:input={debounce(onInput, INPUT_DEBOUNCE_TIME_LONG)}
        />
      </span>
    </div>
  </dt>

  {#if showTable}
    <dd
      class="mt-2 pr-12"
      transition:slide={{ delay: 0, duration: 300, easing: quintOut }}
    >
      <Table>
        <Thead>
          <Tr>
            <Th>Adjustment Name</Th>
            <Th>Adjusted By</Th>
            <Th />
          </Tr>
        </Thead>
        <TBody>
          {#each productCosts as productCost}
            <Tr>
              <Td>
                {productCost.costAdjustment.name}
              </Td>
              <Td>
                {productCost.costAdjustment.costAdjustmentType.name ?? "N/A"}
              </Td>
              <Td>
                <Button
                  link={true}
                  on:click={(_) => deleteProductCost(productCost.id)}
                >
                  Remove
                </Button>
              </Td>
            </Tr>
          {/each}
        </TBody>
      </Table>
    </dd>
  {/if}
</div>
