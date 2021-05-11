/* istanbul ignore file */

import { useState } from 'react';


const getQuery = () => {
    if (typeof window !== 'undefined') {
        return new URLSearchParams(window.location.search);
    }
    return new URLSearchParams();
};

const getQueryStringVal = (key: string): number | null => {
    return parseInt(getQuery().get(key) || '');
};

const useQueryParam = (
    key: string,
    defaultVal: number
): [number, (val: number) => void] => {
    const [query, setQuery] = useState<number>(getQueryStringVal(key) || defaultVal);

    const updateUrl = (newVal: number) => {
        setQuery(newVal);

        const query = getQuery();
        query.set(key, newVal.toString());
        window.history.pushState(undefined, 'Book browser', `http://localhost:3000?${key}=${newVal}`);

    };

    return [query, updateUrl];
};

export default useQueryParam;