import { PLAYING_STATES } from '@components/Player/types';
import { atom } from 'recoil';
import { NowPlayingStateType } from './types';

export const nowPlayingState = atom<NowPlayingStateType>({
  key: 'nowPlayingState',
  default: {
    url: '',
    nowPlayingState: PLAYING_STATES.STATE_RADIO,
    isPlaying: false
  }
});
