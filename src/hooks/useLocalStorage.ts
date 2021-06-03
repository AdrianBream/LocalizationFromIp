import { useState } from 'react';

export function useLocalStorage<T>(key: string, emptyValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
      try {
        const item = window.localStorage.getItem(key);

        return item ? JSON.parse(item) : emptyValue;
      } catch (error) {
        console.error(error);
      }
    });

    const setValue = (value: T) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
        setStoredValue(value);
      } catch (error) {
        console.error(error);
      }
    };
    return [storedValue, setValue] as const;
  }