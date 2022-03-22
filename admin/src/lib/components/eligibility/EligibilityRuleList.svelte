<script lang="ts">
  import { goto } from "$app/navigation";
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
  import type { EligibilityRuleFragment } from "$lib/graphql.types";
  import { deleteEligibilityRule } from "$lib/queries/eligibility";
  import { createEventDispatcher } from "svelte";

  export let eligibilityRules: EligibilityRuleFragment[];
  const dispatch = createEventDispatcher();

  async function onDelete(id: string) {
    await deleteEligibilityRule({ id });
    dispatch("refresh");
  }
</script>

<Table>
  <Thead>
    <Tr>
      <Th>Name</Th>
      <Th />
    </Tr>
  </Thead>
  <TBody>
    {#each eligibilityRules as { id, name } (id)}
      <tr on:click={(_) => goto(`eligibility/${id}`)} class="cursor-pointer">
        <Td>
          <Typography variant="td2">{name}</Typography>
        </Td>

        <Td class="w-1">
          <span on:click|stopPropagation={() => onDelete(id)}>
            <IconButton icon="OutlineTrash" title="Delete" />
          </span>
        </Td>
      </tr>
    {/each}
  </TBody>
</Table>
