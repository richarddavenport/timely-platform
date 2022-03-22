<script lang="ts">
  import {
    Button,
    Card,
    IconButton,
    Input,
    Label,
    Select,
    Table,
    TBody,
    Td,
    Th,
    Thead,
    Tr,
  } from "$lib/components/base";
  import {
    deleteCostAdjustmentLookup,
    insertCostAdjustmentLookup,
    updateCostAdjustment,
  } from "$lib/queries/costAdjustments";
  import { currentCostAdjustment } from "$lib/stores/costAdjustmentStore";
  import { store } from "$lib/stores/store";
  import lodash from "lodash";
  import CostAdjustmentValueItem from "./CostAdjustmentValueItem.svelte";
  const { startCase, debounce } = lodash;

  const DEBOUNCE_TIME = 1500;

  let startElement: HTMLElement;
  let startValue: number;
  let endValue: number;
  let singleValue: string;
  let cost: number;
  let costAdjustmentTypeId: number;
  let defaultLookupCost: number = 0;

  let activeTab: "range" | "single" = "range";

  $: costAdjustmentLookups =
    $currentCostAdjustment?.costAdjustmentLookups ?? [];
  $: header = `Adjustments using ${startCase(
    $currentCostAdjustment?.costAdjustmentType?.name ?? "nothing"
  )}`;

  $: currentCostAdjustment.subscribe((state) => {
    if (state) {
      costAdjustmentTypeId = state.costAdjustmentType?.id;
    }
  });

  async function onAdd() {
    const success = await insertCostAdjustmentLookup({
      object: {
        costAdjustmentId: $currentCostAdjustment.id,
        startValue,
        endValue,
        singleValue,
        cost,
      },
    });
    if (success) {
      startValue = null;
      endValue = null;
      singleValue = null;
      cost = null;
      startElement.focus();
    }
  }

  function onInput() {
    updateCostAdjustment({
      id: $currentCostAdjustment.id,
      set: {
        costAdjustmentTypeId,
        defaultLookupCost:
          defaultLookupCost.toString() === "" ? 0 : defaultLookupCost,
      },
    });
  }
</script>

<Card
  {header}
  subHeader="Add or Edit cost adjustments using ranges or single values."
>
  <form>
    <div>
      <div class="grid grid-cols-1 gap-6">
        <div>
          <Label labelFor="adjustment-type">Cost Adjusted By</Label>
          <div class="flex items-center gap-x-1">
            <Select
              class="w-xs"
              bind:value={costAdjustmentTypeId}
              placeholder="Please select an adjustment"
              name="adjustment-type"
              id="adjustment-type"
              on:input={debounce(onInput, DEBOUNCE_TIME)}
            >
              {#each $store.getCostAdjustmentsQuery.costAdjustmentTypes as costAdjustmentType}
                <option value={costAdjustmentType.id}
                  >{costAdjustmentType.name}</option
                >
              {/each}
            </Select>
            {#if costAdjustmentTypeId !== null}
              <span
                ><IconButton
                  icon="OutlineX"
                  on:click={(_) => {
                    costAdjustmentTypeId = null;
                    onInput();
                  }}
                /></span
              >
            {/if}
          </div>
        </div>

        <div>
          <Label labelFor="defaultLookupCost">Default Lookup Cost</Label>
          <Input
            class="w-xs"
            bind:value={defaultLookupCost}
            name="defaultLookupCost"
            id="defaultLookupCost"
            type="number"
            on:input={debounce(onInput, DEBOUNCE_TIME)}
          />
        </div>
      </div>
    </div>
  </form>

  <form on:submit|preventDefault={onAdd}>
    <div class="max-w-sm">
      <div class="flex items-center">
        <div class="flex group p-0.5 rounded-lg bg-gray-100 hover:bg-gray-200">
          <button
            type="button"
            class="flex focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 rounded-md focus:outline-none focus-visible:ring-offset-gray-100"
            tabindex={activeTab === "range" ? 0 : -1}
            on:click={() => (activeTab = "range")}
          >
            <span
              x-show={activeTab === "range" ? true : false}
              class="p-1.5 lg:pl-2.5 lg:pr-3.5 rounded-md flex items-center text-sm font-medium {activeTab ===
              'range'
                ? 'bg-white shadow-sm ring-1 ring-black ring-opacity-5'
                : ''}"
            >
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                fill="none"
                class="lg:mr-2 group-hover:text-gray-900 {activeTab === 'range'
                  ? 'text-teal-500'
                  : 'text-gray-500 group-hover:text-gray-900'}"
              >
                <path
                  d="M17.25 10c0 1-1.75 6.25-7.25 6.25S2.75 11 2.75 10 4.5 3.75 10 3.75 17.25 9 17.25 10z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <circle
                  cx="10"
                  cy="10"
                  r="2.25"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span
                class="sr-only lg:not-sr-only text-gray-600 group-hover:text-gray-900 {activeTab ===
                'range'
                  ? 'text-gray-900'
                  : 'text-gray-600 group-hover:text-gray-900'}">Range</span
              >
            </span>
          </button>
          <button
            type="button"
            class="ml-0.5 p-1.5 lg:pl-2.5 lg:pr-3.5 rounded-md flex items-center text-sm text-gray-600 font-medium focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus:outline-none focus-visible:ring-offset-gray-100 {activeTab ===
            'single'
              ? 'bg-white shadow-sm ring-1 ring-black ring-opacity-5'
              : ''}"
            tabindex="0"
            on:click={() => (activeTab = "single")}
          >
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              fill="none"
              class="lg:mr-2 {activeTab === 'single'
                ? 'text-teal-500'
                : 'text-gray-500 group-hover:text-gray-900'}"
            >
              <path
                d="M13.75 6.75l3.5 3.25-3.5 3.25M6.25 13.25L2.75 10l3.5-3.25"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span
              class="sr-only lg:not-sr-only {activeTab === 'single'
                ? 'text-gray-900'
                : 'text-gray-600 group-hover:text-gray-900'}">Single</span
            >
          </button>
        </div>
      </div>
      <div class="mt-1 min-h-20">
        {#if activeTab === "range"}
          <div class="flex -space-x-px w-xs">
            <div class="flex-1">
              <Input
                type="number"
                bind:value={startValue}
                bind:htmlElement={startElement}
                class="w-full rounded-none rounded-l"
                placeholder="Start"
              />
            </div>
            <div class="flex-1">
              <Input
                bind:value={endValue}
                type="number"
                class="w-full rounded-none rounded-r"
                placeholder="End"
              />
            </div>
          </div>
        {:else if activeTab === "single"}
          <div>
            <Input
              class="w-xs"
              bind:htmlElement={startElement}
              bind:value={singleValue}
              placeholder="Value"
            />
          </div>
        {/if}
        <div class="mt-4 flex w-xs justify-between">
          <Input bind:value={cost} type="number" placeholder="Cost" />
          <Button type="submit">Add</Button>
        </div>
      </div>
    </div>
  </form>
  <Table>
    <Thead>
      <Th class="text-center">Values</Th>
      <Th>Cost</Th>
      <Th />
    </Thead>
    <TBody>
      {#each costAdjustmentLookups as { id, startValue, endValue, singleValue, cost } (id)}
        <Tr>
          <Td>
            {#if !!singleValue}
              <div class="flex justify-center items-center">
                <CostAdjustmentValueItem
                  {id}
                  type="text"
                  value={singleValue}
                  property="singleValue"
                />
              </div>
            {:else}
              <div class="flex justify-center items-center">
                <CostAdjustmentValueItem
                  {id}
                  value={+startValue}
                  property="startValue"
                />
                <span class="p-4"> - </span>
                <CostAdjustmentValueItem
                  {id}
                  value={+endValue}
                  property="endValue"
                />
              </div>
            {/if}
          </Td>
          <Td>
            <CostAdjustmentValueItem {id} value={cost} property="cost" />
          </Td>
          <Td class="w-1">
            <span on:click={(_) => deleteCostAdjustmentLookup(id)}>
              <IconButton icon="OutlineTrash" />
            </span>
          </Td>
        </Tr>
      {/each}
    </TBody>
  </Table>
</Card>
