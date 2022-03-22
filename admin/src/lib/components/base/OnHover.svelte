<script lang="ts">
  let hovering = false;

  $: slotProps = { hovering };
</script>

<div
  on:mouseenter={() => (hovering = true)}
  on:mouseleave={() => (hovering = false)}
>
  <slot {...slotProps} />
</div>
