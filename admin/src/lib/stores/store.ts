import { useQuery } from "$lib/utils/useQuery";
import type { Writable } from "svelte/store";
import { writable } from "svelte/store";
import type {
  GetCostAdjustmentsQuery,
  GetEligibilityRulesQuery,
} from "../graphql.types";
import {
  GetCostAdjustmentsDocument,
  GetEligibilityRulesDocument,
} from "../graphql.types";

interface State {
  getCostAdjustmentsQuery: GetCostAdjustmentsQuery;
  getEligibilityRulesQuery: GetEligibilityRulesQuery;
}

function createStore() {
  const { subscribe, set, update }: Writable<State> = writable({
    getCostAdjustmentsQuery: null,
    getEligibilityRulesQuery: null,
  });

  return {
    subscribe,
    set,
    update,

    refreshCostAdjustments: async () => {
      const { data, errors } = await useQuery({
        fetch,
        operation: GetCostAdjustmentsDocument,
      });
      if (errors) {
        alert("error, check console");
        console.error(errors);
      } else {
        update((state) => ({
          ...state,
          getCostAdjustmentsQuery: data,
        }));
      }
    },

    refreshEligibilities: async () => {
      const { data, errors } = await useQuery({
        fetch,
        operation: GetEligibilityRulesDocument,
      });
      if (errors) {
        alert("error, check console");
        console.error(errors);
      } else {
        update((state) => ({
          ...state,
          getEligibilitiesQuery: data,
        }));
      }
    },
  };
}

export const store = createStore();
