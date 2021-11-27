import { PLAYING_STATES } from '../components/Player/types';
import { DEFAULT_TRACK } from '../util/constants';
import { selector } from 'recoil';
import { nowPlayingAtom } from './atoms';
import TrackPlayer from 'react-native-track-player';
import { getIsPlaying } from '../util/getPlayingState';

export const getNowPlayingState = selector({
  key: 'getNowPlayingState',
  get: async ({ get }) => {
    const { url } = get(nowPlayingAtom);
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
  set: ({ set, get }, newVal: any) => {
    const state = get(nowPlayingAtom);
    set(nowPlayingAtom, { ...state, ...newVal });
  }
});
