import { useQuery } from 'react-query';
import { Show } from './types';
import config from 'react-native-config';

export const useShows = () => {
  const { data, isLoading, error } = useQuery(
    'getShows',
    async () => {
      try {
        const resp = await fetch('https://arcsi.lahmacun.hu/arcsi/show/all', {
          headers: {
            'Authentication-Token': config.REACT_APP_API_KEY || ''
          }
        });
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
