import { useState } from 'react';
import { PLAYING_STATES } from '../Player/types';
import { UseShowEpisodeProps } from './types';
// import TrackPlayer from 'react-native-track-player';

export const useShowEpisode = (props: UseShowEpisodeProps) => {
  const { canonizedCoverUrl, id, name, showName, handlePlay, loadTrack } =
    props;
  const [url, setUrl] = useState<string>();

  const onPlayClick = async () => {
    if (!url) {
      const resp = await fetch(
        `https://arcsi.lahmacun.hu/arcsi/item/${encodeURIComponent(id)}/listen`
      );
      try {
        const showUrl: string = await resp.text();
        setUrl(showUrl);
        await loadTrack({
          url: showUrl,
          artist: showName,
          title: name,
          artwork: canonizedCoverUrl
        });
        await handlePlay(PLAYING_STATES.STATE_SHOW);
      } catch (e) {
        console.log('episode error: ', e);
      }
    }
  };

  return {
    onPlayClick
  };
};
