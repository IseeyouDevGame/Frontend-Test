import { useState, useEffect } from 'react';

export function useSearchPersistence(initialValue: string = '') {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem('lastAnimeSearch');
    return stored || initialValue;
  });

  useEffect(() => {
    localStorage.setItem('lastAnimeSearch', value);
  }, [value]);

  return [value, setValue] as const;
}