<script lang="ts">
  import type { IconType } from "./index";
  import OutlineBeaker from "./OutlineBeaker.svelte";
  import OutlineCalendar from "./OutlineCalendar.svelte";
  import OutlineChevronDoubleLeft from "./OutlineChevronDoubleLeft.svelte";
  import OutlineChevronDoubleRight from "./OutlineChevronDoubleRight.svelte";
  import OutlineChevronDown from "./OutlineChevronDown.svelte";
  import OutlineChevronRight from "./OutlineChevronRight.svelte";
  import OutlineClipboardCheck from "./OutlineClipboardCheck.svelte";
  import OutlineClipboardList from "./OutlineClipboardList.svelte";
  import OutlineCollection from "./OutlineCollection.svelte";
  import OutlineDollar from "./OutlineDollar.svelte";
  import OutlineExclamation from "./OutlineExclamation.svelte";
  import OutlineMenu from "./OutlineMenu.svelte";
  import OutlineMinus from "./OutlineMinus.svelte";
  import OutlinePencil from "./OutlinePencil.svelte";
  import OutlinePlus from "./OutlinePlus.svelte";
  import OutlineTrash from "./OutlineTrash.svelte";
  import OutlineTruck from "./OutlineTruck.svelte";
  import OutlineX from "./OutlineX.svelte";
  import SolidDotsHorizontal from "./SolidDotsHorizontal.svelte";
  import SolidMinusSm from "./SolidMinusSm.svelte";

  export let icon: IconType;

  let iconMap: { [key in IconType]: any };
  $: {
    iconMap = {
      OutlineBeaker: OutlineBeaker,
      OutlineCalendar: OutlineCalendar,
      OutlineChevronDoubleLeft: OutlineChevronDoubleLeft,
      OutlineChevronDoubleRight: OutlineChevronDoubleRight,
      OutlineChevronDown: OutlineChevronDown,
      OutlineChevronRight: OutlineChevronRight,
      OutlineClipboardCheck: OutlineClipboardCheck,
      OutlineClipboardList: OutlineClipboardList,
      OutlineCollection: OutlineCollection,
      OutlineDollar: OutlineDollar,
      OutlineExclamation: OutlineExclamation,
      OutlineMenu: OutlineMenu,
      OutlineMinus: OutlineMinus,
      OutlinePencil: OutlinePencil,
      OutlinePlus: OutlinePlus,
      OutlineTrash: OutlineTrash,
      OutlineTruck: OutlineTruck,
      OutlineX: OutlineX,
      SolidDotsHorizontal: SolidDotsHorizontal,
      SolidMinusSm: SolidMinusSm,
    };
  }
</script>

<svelte:component this={iconMap[icon]} {...$$props} />
