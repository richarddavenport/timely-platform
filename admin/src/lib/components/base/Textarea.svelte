<script lang="ts">
  import lodash from "lodash";
  const { uniqueId } = lodash;

  export let value: any;
  export let name: string = "";
  export let id: string = uniqueId("input-id-");
  export let placeholder: string = "";
</script>

<textarea
  bind:value
  {id}
  {placeholder}
  {name}
  rows="2"
  on:click
  on:input
  on:change
  {...$$props}
  class="shadow-sm block dark:bg-gray-700 dark:text-primary-100 focus:ring-primary-500 dark:focus:ring-primary-100 focus:border-primary-500 dark:focus:border-primary-100 sm:text-sm border-gray-300 sm:text-sm border rounded-md px-3 py-2 {$$props.class ||
    ''}"
/>
