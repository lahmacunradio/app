import { NowPlayingState } from '@components/Player/types';

export type NowPlayingStateType = {
  url: string;
  nowPlayingState: NowPlayingState;
  isPlaying: boolean;
};
