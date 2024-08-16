const localStorage = window.localStorage;

/**
 * A function to retrieve a value from local storage.
 * @param key The key of the value to be retrieved from local storage
 * @returns The value of the key in local storage
 * @throws An error if the key is empty
 */
export function getLocalStorage(key: string): string | null {
  if (key === '') throw new Error('Key cannot be empty');

  const value = localStorage.getItem(key);

  return value;
}

/**
 * A function to set a value in local storage.
 * @param key The key of the value to be set in local storage
 * @param value The value to be set in local storage
 * @throws An error if the key is empty
 * @throws An error if the value is empty
 */
export function setLocalStorage(key: string, value: string) {
  if (key === '') throw new Error('Key cannot be empty');
  if (value === '') throw new Error('Value cannot be empty');

  localStorage.setItem(key, value);
}
