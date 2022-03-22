<script lang="ts">
  let ref: HTMLDivElement;
  let focused = false;

  function onWindowClick(event) {
    if (!ref.contains(event.target)) {
      focused = false;
    }
  }

  function closeFn() {
    focused = false;
  }

  $: slotProps = { focused, closeFn };
</script>

<svelte:window on:click={onWindowClick} />

<div
  on:click={() => (focused = true)}
  on:focus={() => (focused = true)}
  bind:this={ref}
>
  <slot {...slotProps} />
</div>
