<script lang="ts">
  import { Button, Card, Input, Label } from "$lib/components/base";
  import {
    INPUT_DEBOUNCE_TIME_LONG,
    INPUT_DEBOUNCE_TIME_SHORT,
  } from "$lib/constants";
  import {
    InsertCostAdjustmentDocument,
    InsertCostAdjustmentMutationVariables,
  } from "$lib/graphql.types";
  import { updateCostAdjustment } from "$lib/queries/costAdjustments";
  import {
    costAdjustmentStore,
    currentCostAdjustment,
  } from "$lib/stores/costAdjustmentStore";
  import { store } from "$lib/stores/store";
  import { useQuery } from "$lib/utils/useQuery";
  import lodash from "lodash";
  const { debounce } = lodash;

  let id: string;
  let name: string;
  let baseCost: number = 0;
  let defaultLookupCost: number = 0;

  $: currentCostAdjustment.subscribe((state) => {
    if (state) {
      id = state.id;
      name = state.name;
    }
  });

  async function onSave() {
    const { data, errors } = await useQuery({
      fetch,
      operation: InsertCostAdjustmentDocument,
      variables: {
        name,
        baseCost: baseCost.toString() === "" ? 0 : baseCost,
        defaultLookupCost,
      } as InsertCostAdjustmentMutationVariables,
    });
    if (errors) {
      alert("error, check console");
      console.error(errors);
    } else {
      costAdjustmentStore.update({
        action: "edit",
        costAdjustmentId: data.insertCostAdjustment.id,
      });
      await store.refreshCostAdjustments();
    }
  }

  function onInput() {
    if ($costAdjustmentStore.action === "edit") {
      updateCostAdjustment({
        id: $currentCostAdjustment.id,
        set: {
          id,
          name,
          baseCost: baseCost.toString() === "" ? 0 : baseCost,
          defaultLookupCost,
        },
      });
    }
  }
</script>

<form on:submit|preventDefault={onSave}>
  <Card
    header="Cost Adjustment"
    subHeader="General cost adjustment information."
  >
    <div>
      <div class="grid grid-cols-1 gap-6">
        <div>
          <Label labelFor="name">Adjustment Name</Label>
          <Input
            class="w-xs"
            bind:value={name}
            name="name"
            id="name"
            on:input={debounce(onInput, INPUT_DEBOUNCE_TIME_LONG)}
          />
        </div>

        <div>
          <Label labelFor="baseCost">Base Cost</Label>
          <Input
            class="w-xs"
            bind:value={baseCost}
            name="baseCost"
            id="baseCost"
            type="number"
            on:input={debounce(onInput, INPUT_DEBOUNCE_TIME_SHORT)}
          />
        </div>
      </div>
    </div>
    <svelte:fragment slot="footer">
      {#if !$currentCostAdjustment}
        <Button type="submit">Save</Button>
      {/if}
    </svelte:fragment>
  </Card>
</form>
