<!-- 
  TODO
  Possibly change this to a ToggleButtonGroup and also create a ToggleButton
  Not sure of the composition yet.
-->
<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let tabs: string[];
  export let selectedIndex: number;
  let activeTab;
  const dispatch = createEventDispatcher();

  function onClick(selectedIndex: string) {
    dispatch("toggle", selectedIndex);
  }
</script>

<div class="flex p-0.5 rounded-lg bg-gray-100 hover:bg-gray-200">
  <button
    type="button"
    class="flex focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 rounded-md focus:outline-none focus-visible:ring-offset-gray-100"
    tabindex={selectedIndex === 0 ? 0 : -1}
    on:click={() => (activeTab = "range")}
  >
    <span
      x-show={activeTab === "range" ? true : false}
      class="p-1.5 lg:pl-2.5 lg:pr-3.5 rounded-md flex items-center text-sm font-medium {activeTab ===
      'range'
        ? 'bg-white shadow-sm ring-1 ring-black ring-opacity-5'
        : ''}"
    >
      <svg
        aria-hidden="true"
        width="20"
        height="20"
        fill="none"
        class="lg:mr-2 group-hover:text-gray-900 {activeTab === 'range'
          ? 'text-teal-500'
          : 'text-gray-500 group-hover:text-gray-900'}"
      >
        <path
          d="M17.25 10c0 1-1.75 6.25-7.25 6.25S2.75 11 2.75 10 4.5 3.75 10 3.75 17.25 9 17.25 10z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle
          cx="10"
          cy="10"
          r="2.25"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span
        class="sr-only lg:not-sr-only text-gray-600 group-hover:text-gray-900 {activeTab ===
        'range'
          ? 'text-gray-900'
          : 'text-gray-600 group-hover:text-gray-900'}">Range</span
      >
    </span>
  </button>
  <button
    type="button"
    class="ml-0.5 p-1.5 lg:pl-2.5 lg:pr-3.5 rounded-md flex items-center text-sm text-gray-600 font-medium focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus:outline-none focus-visible:ring-offset-gray-100 {activeTab ===
    'single'
      ? 'bg-white shadow-sm ring-1 ring-black ring-opacity-5'
      : ''}"
    tabindex="0"
    on:click={() => (activeTab = "single")}
  >
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      fill="none"
      class="lg:mr-2 {activeTab === 'single'
        ? 'text-teal-500'
        : 'text-gray-500 group-hover:text-gray-900'}"
    >
      <path
        d="M13.75 6.75l3.5 3.25-3.5 3.25M6.25 13.25L2.75 10l3.5-3.25"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <span
      class="sr-only lg:not-sr-only {activeTab === 'single'
        ? 'text-gray-900'
        : 'text-gray-600 group-hover:text-gray-900'}">Single</span
    >
  </button>
</div>
