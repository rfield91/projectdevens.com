import { useState, useEffect } from "react";

function getLocalStorageValue(key) {
    const savedValue = localStorage.getItem(key);

    return JSON.parse(savedValue);
}

function getSavedOrDefaultValue(key, defaultValue) {
    return getLocalStorageValue(key) || defaultValue;
}

export const useLocalStorage = (localStorageKey, defaultValue) => {
    const [value, setValue] = useState(() => {
        return getSavedOrDefaultValue(localStorageKey, defaultValue);
    });

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(value));
    }, [localStorageKey, value]);

    return [value, setValue];
};
