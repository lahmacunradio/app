import { PLAYING_STATES } from '@components/Player/types';
import { DEFAULT_TRACK } from '@util/constants';
import { selector } from 'recoil';
import { nowPlayingState } from './atoms';
import TrackPlayer from 'react-native-track-player';
import { getIsPlaying } from '@util/getPlayingState';

export const getNowPlayingState = selector({
  key: 'getNowPlayingState',
  get: async ({ get }) => {
    const { url } = get(nowPlayingState);
    const state = await TrackPlayer.getState();
    return {
      url,
      playingState:
        url === DEFAULT_TRACK.url
          ? PLAYING_STATES.STATE_RADIO
          : PLAYING_STATES.STATE_SHOW,
      isPlaying: getIsPlaying(state)
    };
  },
  set: ({ set }, newVal: any) => {
    set(nowPlayingState, newVal);
  }
});
