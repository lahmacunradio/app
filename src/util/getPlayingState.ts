import { State } from 'react-native-track-player';

export const getIsPlaying = (state: any) =>
  (state as unknown) === State.Playing ||
  (state as unknown) === State.Buffering ||
  (state as unknown) === 'loading' ||
  (state as unknown) === State.Connecting;
