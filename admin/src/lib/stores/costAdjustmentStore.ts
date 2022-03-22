import lodash from "lodash";
const { startCase } = lodash;
import type { Writable } from "svelte/store";
import { derived, writable } from "svelte/store";
import { store } from "./store";

type Action = "add" | "edit" | undefined;
export type CostActiveTab = "general" | "adjustments" | undefined;

export interface CostAdjustmentStoreModel {
  action: Action;
  activeTab: CostActiveTab;
  costAdjustmentId: string | undefined;
  modalOpen: boolean;
}

function createStore() {
  const { subscribe, set, update }: Writable<CostAdjustmentStoreModel> = writable({
    action: undefined,
    activeTab: undefined,
    costAdjustmentId: undefined,
    modalOpen: false,
  });

  return {
    subscribe,
    set: (state) => costAdjustmentStore.update(state),

    init: () => {
      const url = new URL(window.location.toString());
      costAdjustmentStore.update({
        action: url.searchParams.get("action") as Action,
        modalOpen: url.searchParams.get("modalOpen") === "true",
        costAdjustmentId: url.searchParams.get("costAdjustmentId"),
        activeTab: url.searchParams.get("activeTab") as CostActiveTab,
      });
    },

    update: (newState: Partial<CostAdjustmentStoreModel>) => {
      const url = new URL(location.toString());
      for (const key in newState) {
        if (Object.prototype.hasOwnProperty.call(newState, key)) {
          const value = newState[key];
          if (value) {
            url.searchParams.set(key, value);
          } else {
            url.searchParams.delete(key);
          }
        }
      }
      history.pushState({}, "", url);
      update((state) => ({
        ...state,
        ...newState,
      }));
    },

    closeModal: () => {
      const url = new URL(location.toString());
      // better to be explicit here and only remove known properties, instead of all search params
      url.searchParams.delete("action");
      url.searchParams.delete("costAdjustmentId");
      url.searchParams.delete("modalOpen");
      url.searchParams.delete("activeTab");
      history.pushState({}, "", url);
      set({
        action: undefined,
        activeTab: undefined,
        costAdjustmentId: undefined,
        modalOpen: false,
      });
    },

    openModalForAdd: () => {
      costAdjustmentStore.update({
        action: "add",
        modalOpen: true,
        activeTab: "general",
        costAdjustmentId: null,
      });
    },

    openModalForEdit: (costAdjustmentId: string, activeTab: CostActiveTab) => {
      costAdjustmentStore.update({
        action: "edit",
        modalOpen: true,
        activeTab,
        costAdjustmentId,
      });
    },
  };
}

export const costAdjustmentStore = createStore();

export const currentCostAdjustment = derived(
  [costAdjustmentStore, store],
  ([$costAdjustmentStore, $store]) =>
    $store?.getCostAdjustmentsQuery?.costAdjustments?.find(
      (costAdjustment) => costAdjustment.id === $costAdjustmentStore.costAdjustmentId
    )
);

export const costModalTitle = derived(
  [costAdjustmentStore, currentCostAdjustment],
  ([$costAdjustmentStore, $currentCostAdjustment]) => {
    if ($costAdjustmentStore.action === "add") {
      return `${startCase($costAdjustmentStore.action)} Cost`;
    } else {
      return `${startCase($costAdjustmentStore.action)} Cost: ${
        $currentCostAdjustment?.name
      }`;
    }
  }
);
