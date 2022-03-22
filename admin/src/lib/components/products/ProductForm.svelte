<script lang="ts">
  import {
    Button,
    Card,
    Input,
    Label,
    Select,
    Textarea,
    Typography,
  } from "$lib/components/base";
  import type {
    CategoryBaseFragment,
    ProductBaseFragment,
  } from "$lib/graphql.types";
  import { createEventDispatcher } from "svelte";

  export let categories: CategoryBaseFragment[];
  export let product: ProductBaseFragment;
  export let fetching: boolean;

  const dispatch = createEventDispatcher();

  function onSave() {
    dispatch("save", product);
  }

  function onInput() {
    dispatch("input", product);
  }
</script>

<form on:submit|preventDefault={onSave}>
  <Card header="Product Information" subHeader="General product information.">
    <div class="grid grid-cols-1 gap-6">
      <div>
        <Label labelFor="name">Name</Label>
        <Input
          class="w-xs"
          bind:value={product.name}
          name="name"
          id="name"
          on:input={onInput}
        />
      </div>

      <div>
        <Label labelFor="description">Description</Label>
        <Textarea
          bind:value={product.description}
          id="description"
          name="description"
          class="w-xs"
          on:input={onInput}
        />
        <Typography variant="subtitle2" class="mt-2">
          Description for the product.
        </Typography>
      </div>

      <div>
        <Label labelFor="category">Category</Label>
        <Select
          class="w-xs"
          bind:value={product.categoryId}
          placeholder="Please select category"
          name="category"
          id="category"
          on:input={onInput}
        >
          {#each categories as category}
            <option value={category.id}>{category.name}</option>
          {/each}
        </Select>
      </div>
    </div>
    <svelte:fragment slot="footer">
      {#if !product.id}
        <Button type="submit" disabled={fetching}>Save</Button>
      {/if}
    </svelte:fragment>
  </Card>
</form>
