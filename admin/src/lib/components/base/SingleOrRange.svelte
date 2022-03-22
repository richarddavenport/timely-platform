<script lang="ts">
  import type { IconType } from "$lib/components/icon";
  import Icon from "$lib/components/icon";
  import { classNames } from "$lib/utils/classNames";
  import { Tab, TabGroup, TabList } from "@rgossiaux/svelte-headlessui";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let defaultIndex = 0;

  type Tab = { name: "Single" | "Range"; icon: IconType };
  let tabs: Tab[] = [
    { name: "Single", icon: "SolidMinusSm" },
    { name: "Range", icon: "SolidDotsHorizontal" },
  ];
</script>

<TabGroup
  class="flex items-center"
  as="div"
  on:change={(event) => {
    dispatch("change", event.detail);
  }}
  {defaultIndex}
>
  <TabList
    class="flex group p-0.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
  >
    {#each tabs as tab}
      <Tab
        key={tab.name}
        class={({ selected }) =>
          "flex focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 rounded-md focus:outline-none focus-visible:ring-offset-gray-100"}
        let:selected
      >
        <span
          class={classNames(
            "p-1.5 lg:pl-2.5 lg:pr-3.5 rounded-md flex items-center text-sm font-medium",
            selected
              ? "bg-white dark:bg-gray-800 dark:text-primary-100 shadow-sm ring-1 ring-black ring-opacity-5"
              : ""
          )}
        >
          <Icon
            icon={tab.icon}
            class={classNames(
              selected
                ? "text-teal-500"
                : "text-gray-500 dark:text-primary-100 group-hover:text-gray-900 dark:group-hover:text-primary-100"
            )}
          />
          <span
            class={classNames(
              "sr-only lg:not-sr-only text-gray-600 group-hover:text-gray-900 dark:group-hover:text-primary-100",
              selected
                ? "text-gray-900 dark:text-primary-100"
                : "text-gray-600 dark:text-primary-100 group-hover:text-gray-900 dark:group-hover:text-primary-100"
            )}
          >
            {tab.name}
          </span>
        </span>
      </Tab>
    {/each}
  </TabList>
</TabGroup>
