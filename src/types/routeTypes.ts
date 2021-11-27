import { Show, ShowItem } from '../components/Arcsi/types';

export type StackParamList = {
  Shows: { show: Show };
  Episode: { episode: ShowItem; url: string; showName: string };
};
