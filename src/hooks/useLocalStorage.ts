import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [isLoading, setIsLoading] = useState(true);
    const [value, _setValue] = useState<T>(() => {
        return initialValue;
    });

    const setValue = (value: T) => {
        localStorage.setItem(key, JSON.stringify(value));
        _setValue(value);
    };

    useEffect(() => {
        const jsonValue = localStorage.getItem(key);
        if (jsonValue) {
            _setValue(JSON.parse(jsonValue));
        }
        setIsLoading(false);
    }, []);

    return [value, setValue, isLoading] as const;
}
