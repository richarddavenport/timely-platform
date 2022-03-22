<script lang="ts">
  export let value: any = null;
  export let placeholder = "Select ...";
</script>

<select
  bind:value
  class="pl-3 py-2 pr-10 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-100 dark:focus:border-primary-100 dark:bg-gray-700 dark:text-primary-100 sm:text-sm rounded-md {$$props.class || ""}"
  on:input
  on:change
>
  <option disabled selected value={null}>{placeholder}</option>
  <slot />
</select>
