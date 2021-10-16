import { Track } from 'react-native-track-player';
import { NowPlayingState } from '../Player/types';

export interface UseShowEpisodeProps {
  id: number;
  canonizedCoverUrl: string;
  name: string;
  showName: string;
  loadTrack: (track?: Track) => Promise<void>;
  handlePlay: (state: NowPlayingState) => Promise<void>;
}
