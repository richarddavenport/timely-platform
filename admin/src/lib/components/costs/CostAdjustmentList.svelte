<script lang="ts">
  import { buildHref } from "$lib/actions/buildHref";
  import {
    IconButton,
    Table,
    TBody,
    Td,
    Th,
    Thead,
    Tr,
    Typography,
  } from "$lib/components/base";
  import { deleteCostAdjustment } from "$lib/queries/costAdjustments";
  import { costAdjustmentStore } from "$lib/stores/costAdjustmentStore";
  import { store } from "$lib/stores/store";
</script>

<Table>
  <Thead>
    <Tr>
      <Th>Name</Th>
      <Th>Adjusted By</Th>
      <Th>Adjustments Count</Th>
      <Th />
      <Th />
    </Tr>
  </Thead>
  <TBody>
    {#each $store.getCostAdjustmentsQuery.costAdjustments as { id, name, costAdjustmentType, costAdjustmentLookups } (id)}
      <tr
        on:click={(_) => costAdjustmentStore.openModalForEdit(id, "general")}
        class="cursor-pointer"
      >
        <Td>
          <Typography variant="td1">{name}</Typography>
        </Td>
        <Td>
          <Typography variant="td2">
            {costAdjustmentType?.name ?? "N/A"}
          </Typography>
        </Td>
        <Td>
          <Typography variant="td2">{costAdjustmentLookups.length}</Typography>
        </Td>
        <td
          class="px-6 py-4 whitespace-nowrap w-1"
          on:click|stopPropagation={() => {}}
        >
          <a
            href="/"
            use:buildHref={{
              id,
              activeTab: "adjustments",
              idType: "costAdjustmentId",
            }}
          >
            <IconButton icon="OutlineClipboardCheck" title="Adjustments" />
          </a>
        </td>
        <Td class="w-1">
          <span on:click|stopPropagation={(_) => deleteCostAdjustment(id)}>
            <IconButton icon="OutlineTrash" title="Delete" />
          </span>
        </Td>
      </tr>
    {/each}
  </TBody>
</Table>
