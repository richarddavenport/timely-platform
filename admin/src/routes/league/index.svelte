<script context="module" lang="ts">
  import {
    Button,
    IconButton,
    Table,
    TBody,
    Td,
    Th,
    Thead,
    Tr,
    Typography,
  } from "$lib/components/base";
  import type { GetProductListFragment } from "$lib/graphql.types";
  import { deleteProduct, getProductList } from "$lib/queries/products";
  import { pageHeader } from "$lib/stores/pageHeader";
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch }) => {
    const { data, errors } = await getProductList(fetch);
    // TODO: I don't think this works, need to figure out top level errors
    if (errors) {
      console.log(errors);
      return {
        error: JSON.stringify(errors, null, 4),
        status: 500,
      };
    }

    return {
      props: {
        products: data.products,
      },
    };
  };
</script>

<script lang="ts">
  export let products: GetProductListFragment[];
  $pageHeader = "Products";

  function onDelete(id: string) {
    return async function (event) {
      const { errors: _errors } = await deleteProduct({ id });

      if (_errors) {
        alert("error, check console");
        console.error(_errors);
        return;
      }

      const { data, errors } = await getProductList(fetch);

      if (errors) {
        alert("error, check console");
        console.error(errors);
        return;
      }

      products = data.products;
    };
  }
</script>

<Table>
  <Thead>
    <Tr>
      <Th>Name</Th>
      <Th>Category</Th>
      <Th>Description</Th>
      <Th />
      <Th />
    </Tr>
  </Thead>
  <TBody>
    {#each products as { id, name, category, description } (id)}
      <tr>
        <Td>
          <Typography variant="td1">
            <a href="products/{id}" sveltekit:prefetch>{name}</a>
          </Typography>
        </Td>
        <Td>
          <Typography variant="td2">{category.name}</Typography>
        </Td>
        <Td>
          <Typography variant="td2">{description}</Typography>
        </Td>
        <td class="px-6 py-4 whitespace-nowrap w-1">
          {#each category.categoryProductAttributeTypes as { productAttributeType }}
            <a href="products/{id}/attribute/{productAttributeType.id}">
              <IconButton
                icon="OutlineDollar"
                title={`${productAttributeType.description}`}
              />
            </a>
          {/each}
          <a href="products/{id}/costs">
            <IconButton icon="OutlineClipboardCheck" title="Cost Adjustments" />
          </a>

          <a href="products/{id}/eligibility">
            <IconButton icon="OutlineClipboardList" title="Eligibility" />
          </a>

          <a href="products/{id}/testing">
            <IconButton icon="OutlineBeaker" title="Product Test" />
          </a>
        </td>
        <Td class="w-1">
          <span on:click|stopPropagation={onDelete(id)}>
            <IconButton icon="OutlineTrash" title="Delete" />
          </span>
        </Td>
      </tr>
    {/each}
  </TBody>
</Table>

<div class="flex justify-end mt-2">
  <a href="/products/new" sveltekit:prefetch>
    <Button type="button">Add Product</Button>
  </a>
</div>

<slot />
