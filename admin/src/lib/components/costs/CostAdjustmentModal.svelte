<script lang="ts">
  import { Sidenav, SidenavItem, TwoColumnLayout } from "$lib/components/base";
  import { costAdjustmentStore } from "$lib/stores/costAdjustmentStore";
  import CostAdjustmentForm from "./CostAdjustmentForm.svelte";
  import CostAdjustmentValueForm from "./CostAdjustmentValueForm.svelte";
</script>

<TwoColumnLayout>
  <Sidenav slot="column1">
    <SidenavItem
      on:click={() => ($costAdjustmentStore.activeTab = "general")}
      active={$costAdjustmentStore.activeTab === "general"}
      icon="OutlineTruck">General</SidenavItem
    >
    {#if $costAdjustmentStore.action === "edit"}
      <SidenavItem
        on:click={() => ($costAdjustmentStore.activeTab = "adjustments")}
        active={$costAdjustmentStore.activeTab === "adjustments"}
        icon="OutlineDollar">Adjustments</SidenavItem
      >
    {/if}
  </Sidenav>
  <svelte:fragment slot="column2">
    {#if $costAdjustmentStore.activeTab === "general"}
      <CostAdjustmentForm />
    {:else if $costAdjustmentStore.activeTab === "adjustments"}
      <CostAdjustmentValueForm />
    {/if}
  </svelte:fragment>
</TwoColumnLayout>
