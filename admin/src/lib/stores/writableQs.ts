import type { Writable } from "svelte/store";
import { get, writable } from "svelte/store";
import { browser } from "$app/env";
import { parse, stringify } from "qs";
import lodash from "lodash";
const { isEqual } = lodash;

declare type Updater<T> = (value: T) => T;
declare type StoreDict = { [key: string]: Writable<any> };

const stores: StoreDict = {};

export function writableQs<T>(key: string, initialValue: T): Writable<T> {
  function updateQs(key: string, value: T) {
    if (!browser) return;

    const url = new URL(document.URL);
    const str = stringify(value);
    url.searchParams.set(key, str);
    history.pushState({}, "", url);
  }

  if (!stores[key]) {
    const store = writable(initialValue, (set) => {
      const value = browser
        ? new URL(document.URL).searchParams.get(key)
        : null;
      if (value) {
        const parsed = parse(value) as unknown as T
        set(parsed);
      }

      if (browser) {
        const handleChange = () => {
          const url = new URL(document.URL);
          const value = url.searchParams.get(key);
          if (!(value && isEqual(value, get(stores[key])))) {
            const parsed = parse(value) as unknown as T;
            set(parsed);
          }
        };

        window.addEventListener("change", handleChange);

        return () => window.removeEventListener("change", handleChange);
      }
    });

    const { subscribe, set } = store;

    stores[key] = {
      set(value: T) {
        updateQs(key, value);
        set(value);
      },
      update(updater: Updater<T>) {
        const value = updater(get(store));

        updateQs(key, value);
        set(value);
      },
      subscribe,
    };
  }

  return stores[key];
}
