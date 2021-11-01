import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { nowPlayingState } from '../../state/atoms';
import { PLAYING_STATES } from '../Player/types';
import { UseShowEpisodeProps } from './types';

export const useShowEpisode = (props: UseShowEpisodeProps) => {
  const { canonizedCoverUrl, id, name, showName, handlePlay, loadTrack } =
    props;
  const [url, setUrl] = useState<string>();
  const [nowPlayingURL, setNowPlayingURL] = useRecoilState(nowPlayingState);

  const onPlayClick = async () => {
    // WTF?
    if (!url) {
      // if (nowPlayingURL) {
      //   await handlePlay(PLAYING_STATES.STATE_SHOW)
      // }
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
        setNowPlayingURL({ ...nowPlayingURL, url: showUrl });
      } catch (e) {
        console.log('episode error: ', e);
      }
    }
  };

  return {
    onPlayClick,
    isPlaying: !!nowPlayingURL
  };
};
