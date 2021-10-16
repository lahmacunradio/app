import { Track } from 'react-native-track-player';

export const enum PLAYING_STATES {
  STATE_RADIO,
  STATE_SHOW
}
export type NowPlayingState = PLAYING_STATES;

export interface NowPlayingMetadata {
  now_playing: {
    song: {
      art: string;
      artist: string;
      title: string;
    };
  };
  playing_next: {
    song: {
      art: string;
      artist: string;
      title: string;
    };
  };
}

export interface PlayerProps {
  isPlaying: boolean;
  loadTrack: (track?: Track) => Promise<void>;
  handlePlay: (state: NowPlayingState) => Promise<void>;
}
