import { arcsiRequest } from '../../util/arcsiRequest';
import { Show } from '../../components/Shows/types';
import { useQuery } from 'react-query';
import { useMemo } from 'react';

export const useShowDetail = (props: { showBaseUrl: string }) => {
  const { data } = useQuery(
    'getItems',
    async () => await arcsiRequest<Show>(`/show/${props.showBaseUrl}/page`)
  );

  const orderedItems = useMemo(() => {
    if (!data || !data.items) {
      return [];
    }
    const availableItems = data.items.filter(item => {
      const d = new Date();
      const today = d.toISOString().split('T')[0];
      return item.archived && item.play_date < today;
    });
    return availableItems.sort((a, b) => {
      const dateA = new Date(a.play_date).getTime();
      const dateB = new Date(b.play_date).getTime();
      if (dateA < dateB) {
        return 1;
      } else if (dateA > dateB) {
        return -1;
      }
      return 0;
    });
  }, [data]);

  return {
    items: orderedItems
  };
};
