<script context="module" lang="ts">
  import { goto } from "$app/navigation";
  import Modal from "$lib/components/base/Modal.svelte";
  import Sidenav from "$lib/components/base/Sidenav.svelte";
  import SidenavItem from "$lib/components/base/SidenavItem.svelte";
  import TwoColumnLayout from "$lib/components/base/TwoColumnLayout.svelte";
  import ProductForm from "$lib/components/products/ProductForm.svelte";
  import {
    GetCategoriesDocument,
    GetCategoriesQuery,
    InsertProductDocument,
    ProductBaseFragment,
  } from "$lib/graphql.types";
  import { useQuery } from "$lib/utils/useQuery";
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch }) => {
    const { data, errors } = await useQuery({
      fetch,
      operation: GetCategoriesDocument,
    });
    if (errors) {
      console.log(errors);
      return {
        error: JSON.stringify(errors, null, 4),
        status: 500,
      };
    }

    return {
      props: {
        getCategoriesQuery: data,
      },
    };
  };
</script>

<script lang="ts">
  export let getCategoriesQuery: GetCategoriesQuery;

  let product: ProductBaseFragment = {
    id: null,
    name: null,
    description: null,
    categoryId: null,
  };
  let fetching = false;

  async function onSave(event: CustomEvent<ProductBaseFragment>) {
    fetching = true;
    const { data, errors } = await useQuery({
      fetch,
      operation: InsertProductDocument,
      variables: {
        categoryId: event.detail.categoryId,
        description: event.detail.description,
        name: event.detail.name,
      },
    });
    fetching = false;
    if (errors) {
      alert("error, check console");
      console.error(errors);
      return;
    }
    goto(`/products/${data.insertProduct.id}`);
  }
</script>

<Modal isOpen={true} title="Add Product" on:close={() => goto("products")}>
  <TwoColumnLayout>
    <Sidenav slot="column1">
      <a href="products/new">
        <SidenavItem icon="OutlineTruck">Product</SidenavItem>
      </a>
    </Sidenav>
    <ProductForm
      slot="column2"
      {product}
      categories={getCategoriesQuery.categories}
      {fetching}
      on:save={onSave}
    />
  </TwoColumnLayout>
</Modal>
