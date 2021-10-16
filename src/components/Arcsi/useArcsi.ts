import { useQuery } from 'react-query';
import { Show } from './types';

export const useArcsi = () => {
  const { data, isLoading, error } = useQuery(
    'getShows',
    async () => {
      try {
        const resp = await fetch('https://arcsi.lahmacun.hu/arcsi/show/all');
        console.log('fetched');
        return (await resp.json()) as Show[];
      } catch (e) {
        console.log(e);
      }
    },
    { cacheTime: 120000 }
  );

  return {
    data,
    isLoading,
    error
  };
};
