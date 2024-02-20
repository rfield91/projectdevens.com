import { useLocalStorage } from "./use-local-storage";

export function useUpdatableList(key: string, initialValue: string[]) {
  const [storedList, setStoredList, isLoading] = useLocalStorage<string[]>(
    key,
    initialValue
  );

  const updaterFunction = (key: string, isEnabled: boolean) => {
    const currentIndex = storedList.indexOf(key);

    if (!isEnabled && currentIndex === -1) {
      setStoredList([...storedList, key]);
    } else if (isEnabled && currentIndex > -1) {
      const newFilters = [...storedList];

      newFilters.splice(currentIndex, 1);

      setStoredList(newFilters);
    }
  };

  return {
    storedList: storedList,
    updaterFunction: updaterFunction,
    isLoading: isLoading,
  };
}
