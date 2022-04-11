import { Show, ShowItem } from '../components/Shows/types';

export type StackParamList = {
  Shows: { show: Show };
  Episode: { episode: ShowItem; url: string; showName: string };
};
