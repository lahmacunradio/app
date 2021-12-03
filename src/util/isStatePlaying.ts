import { State } from 'react-native-track-player';

export const isStatePlaying = (state: any) =>
  state === State.Playing ||
  state === State.Buffering ||
  state === 'loading' ||
  state === 'buffering' ||
  state === State.Connecting;
