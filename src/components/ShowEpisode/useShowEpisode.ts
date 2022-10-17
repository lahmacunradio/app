import { useState } from 'react';
import TrackPlayer from 'react-native-track-player';
import { PLAYING_STATES } from '../Player/types';
import { UseShowEpisodeProps } from './types';
import config from 'react-native-config';

export const useShowEpisode = (props: UseShowEpisodeProps) => {
  const { canonizedCoverUrl, id, name, showName, handlePlay, loadTrack } =
    props;
  const [url, setUrl] = useState<string>('');

  const onPlayClick = async () => {
    try {
      if (!url) {
        const response = await fetch(
          `https://arcsi.lahmacun.hu/arcsi/item/${encodeURIComponent(
            id
          )}/listen`,
          {
            headers: {
              'Authentication-Token': config.REACT_APP_API_KEY || ''
            }
          }
        );
        const responseBody: string = await response.text();
        setUrl(responseBody);
        await TrackPlayer.stop();
        await TrackPlayer.removeUpcomingTracks();
        await TrackPlayer.reset();
        await loadTrack({
          url: responseBody,
          artist: showName,
          title: name,
          artwork: canonizedCoverUrl
        });
      }
      await handlePlay(PLAYING_STATES.STATE_SHOW);
    } catch (e) {
      console.log('episode error: ', e);
    }
  };

  return {
    onPlayClick,
    url
  };
};
