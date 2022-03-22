<script lang="ts">
  import uniqueId from "lodash/uniqueId.js";
  export let type: "number" | "text" = "text";
  export let value: any;
  export let name: string = "";
  export let id: string = uniqueId("input-id-");
  export let placeholder: string = "";
  export let htmlElement: HTMLElement = null;

  const setType = (node) => {
    node.type = type;
  };
</script>

<input
  {id}
  {placeholder}
  {name}
  class="dark:bg-gray-700 dark:text-primary-100 focus:ring-primary-500 dark:focus:ring-primary-100 focus:border-primary-500 dark:focus:border-primary-100 sm:text-sm border-gray-300 rounded-md placeholder-primary-200 {$$props.class ||
    ''}"
  use:setType
  bind:value
  bind:this={htmlElement}
  on:click
  on:input
  on:change
  on:blur
/>
