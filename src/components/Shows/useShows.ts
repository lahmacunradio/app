import { useQuery } from 'react-query';
import { Show } from './types';
import { useEffect, useMemo, useState } from 'react';
import { arcsiRequest } from '../../util/arcsiRequest';

export const useShows = (props: { searchText: string }) => {
  const [shows, setShows] = useState<Show[] | undefined>();
  const [displayedShows, setDisplayedShows] = useState<Show[] | undefined>();
  const {
    data,
    isLoading,
    refetch: refetchShows
  } = useQuery(
    'getShows',
    async () => {
      try {
        return await arcsiRequest<Show[]>('/show/list');
      } catch (e) {
        console.log(e);
      }
    },
    // TODO: cacheTime needs to be reconsidered
    { cacheTime: 120000 }
  );
  const { refetch: refetchSearch } = useQuery(
    'searchShows',
    async () => {
      const resp = await arcsiRequest<Show[]>(
        `/show/search?size=9999&page=1&param=${props.searchText}`
      );
      setDisplayedShows(resp);
    },
    { enabled: false }
  );

  useEffect(() => {
    setShows(data);
  }, [data]);

  useEffect(() => {
    if (shows) {
      setDisplayedShows(
        shows.sort((a, b) => a.name.localeCompare(b.name, 'hu'))
      );
    }
  }, [shows]);

  useEffect(() => {
    if (props.searchText && props.searchText.length > 2) {
      refetchSearch();
    } else {
      refetchShows();
    }
  }, [props.searchText, refetchSearch, refetchShows]);

  const activeShows = useMemo(() => {
    if (!displayedShows) {
      return [];
    }
    return displayedShows.filter(value => value.active);
  }, [displayedShows]);

  const pastShows = useMemo(() => {
    if (!displayedShows) {
      return [];
    }
    return displayedShows.filter(value => !value.active);
  }, [displayedShows]);

  const sections = useMemo(
    () => [
      {
        title: 'Active Shows',
        data: activeShows
      },
      {
        title: 'Past Shows',
        data: pastShows
      }
    ],
    [activeShows, pastShows]
  );

  return {
    data,
    isLoading,
    sections
  };
};
