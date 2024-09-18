import { TSession } from "@/shared/lib/types";

/**
 * Stores a value in the session storage after serializing it to JSON string.
 *
 * @param {string} key - The key under which the value should be stored.
 * @param {Value} value - The value to store, which will be serialized to JSON.
 * @template Value - The type of the value to be stored.
 */
export const setItem = <Value>(key: string, value: Value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

/**
 * Retrieves an item from session storage and attempts to parse it as JSON.
 *
 * @param {string} key - The key of the item to retrieve from session storage.
 *
 * @template Value
 * @return {Value | null} The retrieved item, parsed as JSON if possible, otherwise returned as is. Returns null if the item does not exist.
 */
export const getItem = <Value>(key: string): Value | null => {
  const item = sessionStorage.getItem(key);

  if (item === null) return null;

  try {
    return JSON.parse(item) as Value;
  } catch {
    return item as Value;
  }
};

/**
 * Removes an item from the session storage.
 *
 * @param {string} key - The key of the item to be removed from session storage.
 */
export const removeItem = (key: string) => {
  sessionStorage.removeItem(key);
};

/**
 * Retrieves the current session data from local storage.
 *
 * This function uses the `getItem` method to fetch the session information stored
 * in local storage under the key "session". If no session data is found, it returns null.
 *
 * @returns {TSession|null} The session data if available, otherwise null.
 */
export const getSession = (): TSession | null => {
  const session = getItem<TSession>("session");

  if (!session) return null;

  return session;
};

/**
 * Updates the current session storage. If a session object is provided,
 * it stores the session; if null is provided, it removes the session.
 *
 * @param {TSession | null} session - The session object to be stored or null to remove it.
 */
export const setSession = (session: TSession | null) => {
  if (session) {
    setItem("session", session);
  } else {
    removeItem("session");
  }
};

/**
 * A function that stores a given value in the local storage under a specified key.
 * The value is serialized to a JSON string before being stored.
 *
 * @template Value
 * @param {string} key - The key under which the value should be stored in local storage.
 * @param {Value} value - The value to be stored, which will be serialized to a JSON string.
 */
export const setLocalItem = <Value>(key: string, value: Value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * Retrieves an item from the local storage and parses it as JSON.
 *
 * @param {string} key - The key under which the value is stored in local storage.
 * @returns {Value|null} - The parsed value associated with the key, or null if the key does not exist.
 */
export const getLocalItem = <Value>(key: string): Value | null => {
  const item = localStorage.getItem(key);

  if (item === null) return null;

  try {
    return JSON.parse(item) as Value;
  } catch {
    return item as Value;
  }
};

/**
 * Removes an item from the local storage.
 *
 * @param {string} key - The key of the item to be removed from local storage.
 */
export const removeLocalItem = (key: string) => {
  localStorage.removeItem(key);
};
