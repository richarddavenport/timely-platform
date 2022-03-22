<script lang="ts">
  export let labelFor: string;
</script>

<label for={labelFor} class="block text-sm font-medium text-gray-700 dark:text-primary-100 cursor-pointer {$$props.class || ""}">
  <slot />
</label>
