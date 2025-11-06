import { useState, useEffect } from 'react';

// Generic hook typed for items that have a `name` property
const useSearch = <T extends { name: string }>(searchTerm: string, files: T[]): T[] => {
    const [results, setResults] = useState<T[]>(files || []);

    useEffect(() => {
        if (searchTerm) {
            const filteredResults = files.filter(file =>
                file.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setResults(filteredResults);
        } else {
            setResults(files);
        }
    }, [searchTerm, files]);

    return results;
};

export default useSearch;