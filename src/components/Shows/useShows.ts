import { useQuery } from 'react-query';
import { Show } from './types';

export const useShows = () => {
  const { data, isLoading, error } = useQuery(
    'getShows',
    async () => {
      try {
        const resp = await fetch('https://arcsi.lahmacun.hu/arcsi/show/all');
        return (await resp.json()) as Show[];
      } catch (e) {
        console.log(e);
      }
    },
    // TODO: cacheTime needs to be reconsidered
    { cacheTime: 120000 }
  );

  return {
    data,
    isLoading,
    error
  };
};
