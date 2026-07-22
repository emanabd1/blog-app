import { atom } from "jotai";

export function createPersistedAtom(key, initialValue) {
  const storageValue = typeof window !== "undefined"
    ? window.localStorage.getItem(key)
    : null;

  const initialStoredValue = storageValue ? JSON.parse(storageValue) : initialValue;
  const baseAtom = atom(initialStoredValue);

  return atom(
    (get) => get(baseAtom),
    (get, set, update) => {
      const nextValue = typeof update === "function"
        ? update(get(baseAtom))
        : update;

      set(baseAtom, nextValue);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(nextValue));
      }
    }
  );
}
