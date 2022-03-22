<script lang="ts">
  import lodash from "lodash";
  const { uniqueId } = lodash;
  import { createEventDispatcher } from "svelte";

  export let value: any;
  export let name: string;
  export let id: string = uniqueId("checkbox-id-");
  export let checked = false;
  export let group: any[] = [];

  const dispatch = createEventDispatcher();

  function onChange(checked) {
    dispatch("checked", checked);
  }
</script>

<input
  {id}
  {name}
  {checked}
  class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded cursor-pointer {$$props.class ||
    ''}"
  type="checkbox"
  bind:value
  bind:group
  on:click
  on:input
  on:change={(e) => onChange(e.currentTarget.checked)}
/>
